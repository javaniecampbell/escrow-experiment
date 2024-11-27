require('dotenv').config();
import { SimpleSpanProcessor, BasicTracerProvider } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { credentials } from '@grpc/grpc-js';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
// const { OTLPTraceExporter: HttpOTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

/* Start of development configuration imports */
import { Tracer } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel, trace } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

import { LoggerProvider, SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { logs } from '@opentelemetry/api-logs';
/* End of development configuration imports */


const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';
const isProduction = environment === 'production';
// Configure logger for debugging, for troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), isDevelopment ? DiagLogLevel.INFO : DiagLogLevel.WARN);



const otlpServer = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
    || 'http://localhost:4317';

// Configure the tracer
const provider = new NodeTracerProvider({
    resource: {
        attributes: {
            SEMRESATTRS_SERVICE_NAME: 'payment_service',
        }
    }
});
let exporter, sdk;
if (otlpServer) {

    ///REMOVE: Disable once fix at https://github.com/open-telemetry/opentelemetry-js/issues/4638 is addressed
    const {
        Detector,
        DetectorSync,
        IResource,
        ResourceDetectionConfig,
        envDetectorSync,
        hostDetectorSync,
        processDetectorSync,
    } = require("@opentelemetry/resources")

    /**
     * A detector that returns attributes from the environment.
     * @param {DetectorSync} detector 
     * @returns {Detector}
     */
    function awaitAttributes(detector) {
        return {
            /**
             * A function that returns a promise that resolves with the attributes
             * @param {ResourceDetectionConfig} config 
             * @returns {Promise<IResource>}
             */
            async detect(config) {
                const resource = detector.detect(config)
                await resource.waitForAsyncAttributes?.()

                return resource
            },
        }
    }

    // Configure OTLP exporter
    const isHttps = otlpServer.startsWith('https://');
    console.log(`isHttps: ${isHttps}`);
    const collectorOptions = {
        // url: otlpServer,
        credentials: !isHttps ? credentials.createInsecure() : credentials.createSsl(),
        // Set to true to enable certificate validation
        // Note: this option is ignored if the protocol is not https
        // ignoreCertificateValidation: false,
    };

    console.log(`collectorOptions: ${JSON.stringify(collectorOptions)}`);
    exporter = new OTLPTraceExporter({
        // url: otlpServer,
        ...collectorOptions,

    });

    sdk = new NodeSDK({
        traceExporter: exporter,
        resource: new Resource({
            [SEMRESATTRS_SERVICE_NAME]: 'payment-service',
            [SEMRESATTRS_SERVICE_VERSION]: '1.0.0',
        }),
        spanProcessors: [new SimpleSpanProcessor(exporter)],
        logger: new ConsoleLogRecordExporter(),
        metricReader: new PeriodicExportingMetricReader({
            exportIntervalMillis: isDevelopment ? 5000 : 10_000,
            exporter: new OTLPMetricExporter(collectorOptions),
        }),
        logRecordProcessor: new SimpleLogRecordProcessor({
            exporter: new OTLPLogExporter(collectorOptions),
        }),
        instrumentations: [
            // ...getNodeAutoInstrumentations({
            //     // We only want to include the http and express instrumentations
            //   "@opentelemetry/instrumentation-http": true,
            //     "@opentelemetry/instrumentation-express": true,
            // }),
            new HttpInstrumentation({
                ignoreIncomingPaths: [
                    '/health',
                    '/metrics',
                    '/metrics/prometheus',
                ],
            }),
            new ExpressInstrumentation(),
        ],
        resourceDetectors: [
            awaitAttributes(envDetectorSync),
            awaitAttributes(hostDetectorSync),
            awaitAttributes(processDetectorSync),
        ]
    });
} else {
    // 
    exporter = new ConsoleSpanExporter();

    const spanProcessor = new SimpleSpanProcessor(exporter);
    provider.addSpanProcessor(spanProcessor);

    // Load auto-instrumentations
    provider.register();
    // To start a logger, you first need to initialize the Logger provider.
    const loggerProvider = new LoggerProvider();
    // Add a processor to export log record
    loggerProvider.addLogRecordProcessor(
        new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
    );
    logs.setGlobalLoggerProvider(loggerProvider);
    registerInstrumentations({
        tracerProvider: provider,
        instrumentations: [
            ...getNodeAutoInstrumentations(),
            // Express instrumentation expects HTTP layer to be instrumented
            new HttpInstrumentation(),
            new ExpressInstrumentation(),
        ],
    });
}
import logger from './logger';
if (sdk) {
    sdk.start();
    logger.info('Tracer successfully started');
}



process.on('SIGTERM', () => {
    logger.info('Received SIGTERM signal, tracer is shutting down gracefully');

    if (sdk) {
        sdk.shutdown().then(() => {
            logger.info('Tracer successfully shutdown');
            process.exit(0);
        });
    }
    provider.shutdown().then(() => {
        logger.info('Tracer successfully shutdown');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('Received SIGINT signal, tracer is shutting down gracefully');

    if (sdk) {
        sdk.shutdown().then(() => {
            logger.log('Tracer successfully shutdown');
            process.exit(0);
        });
    }
    provider.shutdown().then(() => {
        logger.log('Tracer successfully shutdown');
        process.exit(0);
    });
});

process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', err);
});

/**
 * Export the tracer
 * @type {Tracer}
 */
// Export the tracer
export const tracer = isDevelopment ? provider.getTracer('payment-service') : trace.getTracer('payment-service');