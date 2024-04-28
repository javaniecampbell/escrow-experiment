import { WebTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';


const zoneManager = new ZoneContextManager().enable();
const provider = new WebTracerProvider();
provider.register({
    contextManager: zoneManager,
});

const exporter = new ConsoleSpanExporter();
const spanProcessor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(spanProcessor);

export const { getTracer } = provider;
export const tracer = getTracer('escrow-dashboard');