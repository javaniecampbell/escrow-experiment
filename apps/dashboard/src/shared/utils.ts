
export class Point {
    constructor(public x: number, public y: number) { }
}

export class DetectedObject {
    constructor(public x: number, public y: number, public width: number, public height: number, public confidence: number, public labelOrTagId: string, public labelOrTagName: string) { }
}

export class ImageObject {
    constructor(public name: string, public source: string, public width: number, public height: number) { }
}

export class VisionImageObject {
    constructor(public image: string, public detectedObjects: DetectedObject[]) { }
}




function getBoundingBox(image: ImageObject, detectedObject: DetectedObject, colour: string) {
    const yDelta = detectedObject.y * image.height;
    const xDelta = detectedObject.x * image.width;
    const widthDelta = detectedObject.width * image.width;
    const heightDelta = detectedObject.height * image.height;

    const pointDelta = new Point(xDelta, yDelta);
    return {
        pointDelta,
        widthDelta,
        heightDelta,
        colour,
    };
}


export function drawBoundingBox(image: ImageObject, detectedObject: DetectedObject, colour: string) {
    const { pointDelta, widthDelta, heightDelta } = getBoundingBox(image, detectedObject, colour);

    let canvas: HTMLCanvasElement = document?.getElementById(image.name) as HTMLCanvasElement;
    if (!canvas) {
        return;
    }
    let ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = colour;
    ctx.rect(pointDelta.x, pointDelta.y, widthDelta, heightDelta);
    ctx.stroke();
}