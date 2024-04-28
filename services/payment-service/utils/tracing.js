const { Tracer } = require('@opentelemetry/api');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

// Configure logger for debugging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Configure the tracer
const provider = new NodeTracerProvider({
    resource: {
        attributes: {
            service: 'payment_service',
            'service.name': 'payment_service',
        }
    }
});
const exporter = new ConsoleSpanExporter();
const spanProcessor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(spanProcessor);

// Load auto-instrumentations
provider.register(...getNodeAutoInstrumentations());

registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
        // Express instrumentation expects HTTP layer to be instrumented
        HttpInstrumentation,
        ExpressInstrumentation,
    ],
});

/**
 * Export the tracer
 * @type {Tracer}
 */
// Export the tracer
module.exports = { tracer: provider.getTracer('payment_service') };