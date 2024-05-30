require('dotenv').config();
const { Tracer } = require('@opentelemetry/api');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { credentials } =require('@grpc/grpc-js');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const {
    LoggerProvider,
    SimpleLogRecordProcessor,
    ConsoleLogRecordExporter,
} = require('@opentelemetry/sdk-logs');
const logsAPI = require('@opentelemetry/api-logs');


const environment = process.env.NODE_ENV || 'development';
// Configure logger for debugging, for troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), environment === 'development' ? DiagLogLevel.INFO : DiagLogLevel.WARN);

const otlpServer = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
// || 'http://localhost:4317';

// Configure the tracer
const provider = new NodeTracerProvider({
    resource: {
        attributes: {
            service: 'payment_service',
            'service.name': 'payment_service',
        }
    }
});
let exporter;
if (otlpServer) {

    // Configure OTLP exporter
    const isHttps = otlpServer.startsWith('https://');
    const collectorOptions = {
        // url: otlpServer,
        credentials: !isHttps? credentials.createInsecure() : credentials.createSsl(),
        // Set to true to enable certificate validation
        // Note: this option is ignored if the protocol is not https
        // ignoreCertificateValidation: false,
    };
    exporter = new OTLPTraceExporter({
        // url: otlpServer,
        ...collectorOptions,
    
    });
}else{
    // 
    exporter = new ConsoleSpanExporter();
}
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
logsAPI.logs.setGlobalLoggerProvider(loggerProvider);
registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
        ...getNodeAutoInstrumentations(),
        // Express instrumentation expects HTTP layer to be instrumented
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
    ],
});

const logger = require('./logger');

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM signal, tracer is shutting down gracefully');

    provider.shutdown().then(() => {
        logger.log('Tracer successfully shutdown');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('Received SIGINT signal, tracer is shutting down gracefully');

    provider.shutdown().then(() => {
        logger.log('Tracer successfully shutdown');
        process.exit(0);
    });
});

/**
 * Export the tracer
 * @type {Tracer}
 */
// Export the tracer
module.exports = { tracer: provider.getTracer('payment_service') };