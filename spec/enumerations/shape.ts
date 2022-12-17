import { Enumeration, defer } from '../../src';

export abstract class Shape extends Enumeration<Shape, number> 
{
    public static readonly triangle: Shape = defer(() => new Triangle());
    public static readonly square: Shape = defer(() => new Square());
    public static readonly pentagon: Shape = defer(() => new Pentagon());
    public static readonly hexagon: Shape = defer(() => new Hexagon());
    public static readonly heptagon: Shape = defer(() => new Heptagon());

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
    public constructor()
    {
        super(1, 3);

        return;
    }

    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Square extends Shape
{
    public constructor()
    {
        super(2, 4);

        return;
    }

    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Pentagon extends Shape
{
    public constructor()
    {
        super(3, 5);

        return;
    }

    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Hexagon extends Shape
{
    public constructor()
    {
        super(4, 6);

        return;
    }

    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}

export class Heptagon extends Shape
{
    public constructor()
    {
        super(5, 7);

        return;
    }

    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        return context;
    }
}
