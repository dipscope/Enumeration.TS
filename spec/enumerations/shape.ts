import { defer, Enumeration } from '../../src';

export abstract class Shape extends Enumeration<Shape, number> 
{
    public static readonly Triangle: Shape = defer(() => new Triangle(1, 3));
    public static readonly Square: Shape = defer(() => new Square(2, 4));
    public static readonly Pentagon: Shape = defer(() => new Pentagon(3, 5));
    public static readonly Hexagon: Shape = defer(() => new Hexagon(4, 6));
    public static readonly Heptagon: Shape = defer(() => new Heptagon(5, 7));

    public readonly sides: number;

    public constructor(key: number, sides: number)
    {
        super(key);

        this.sides = sides;

        return;
    }

    public abstract draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
}

export class Triangle extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Square extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Pentagon extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Hexagon extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Heptagon extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}
