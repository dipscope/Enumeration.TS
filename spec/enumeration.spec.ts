import { Color } from './enumerations/color';
import { Permission } from './enumerations/permission';
import { Shape, Triangle } from './enumerations/shape';

describe('Enumeration', () =>
{
    it('should get values by key', () =>
    {
        const permissionX = Permission.get(1);
        const permissionY = Permission.get(10);

        expect(permissionX).toBeDefined();
        expect(permissionX).toBeInstanceOf(Permission);
        expect(permissionX).toBe(Permission.None);
        expect(permissionX?.name).toBe('None');
        expect(permissionY).toBeUndefined();

        const colorX = Color.get('Maroon');
        const colorY = Color.get('Green');

        expect(colorX).toBeDefined();
        expect(colorX).toBeInstanceOf(Color);
        expect(colorX).toBe(Color.Maroon);
        expect(colorX?.hex).toBe('#800000');
        expect(colorY).toBeUndefined();

        const shapeX = Shape.get(1);
        const shapeY = Shape.get(10);

        expect(shapeX).toBeDefined();
        expect(shapeX).toBeInstanceOf(Triangle);
        expect(shapeX).toBe(Shape.Triangle);
        expect(shapeX?.sides).toBe(3);
        expect(shapeY).toBeUndefined();
    });

    it('should check values by key', () =>
    {
        const hasPermissionX = Permission.has(3);
        const hasPermissionY = Permission.has(10);

        expect(hasPermissionX).toBeDefined()
        expect(hasPermissionX).toBe(true);
        expect(hasPermissionY).toBeDefined()
        expect(hasPermissionY).toBe(false);

        const hasColorX = Color.has('Silver');
        const hasColorY = Color.has('Green');

        expect(hasColorX).toBeDefined()
        expect(hasColorX).toBe(true);
        expect(hasColorY).toBeDefined()
        expect(hasColorY).toBe(false);

        const hasShapeX = Shape.has(3);
        const hasShapeY = Shape.has(10);

        expect(hasShapeX).toBeDefined()
        expect(hasShapeX).toBe(true);
        expect(hasShapeY).toBeDefined()
        expect(hasShapeY).toBe(false);
    });

    it('should get keys', () =>
    {
        const permissionKeys = new Array<number>();

        for (const permissionKey of Permission.keys())
        {
            expect(permissionKey).toBeInstanceOf(Number);

            permissionKeys.push(permissionKey);
        }

        expect(permissionKeys.length).toBe(5);

        const colorKeys = new Array<string>();

        for (const colorKey of Color.keys())
        {
            expect(colorKey).toBeInstanceOf(String);

            colorKeys.push(colorKey);
        }

        expect(colorKeys.length).toBe(5);

        const shapeKeys = new Array<number>();

        for (const shapeKey of Shape.keys())
        {
            expect(shapeKey).toBeInstanceOf(Number);

            shapeKeys.push(shapeKey);
        }

        expect(shapeKeys.length).toBe(5);
    });

    it('should get values', () =>
    {
        const permissionValues = new Array<Permission>();

        for (const value of Permission.values())
        {
            expect(value).toBeInstanceOf(Permission);

            permissionValues.push(value);
        }

        expect(permissionValues.length).toBe(5);

        const colorValues = new Array<Color>();

        for (const value of Color.values())
        {
            expect(value).toBeInstanceOf(Color);

            colorValues.push(value);
        }

        expect(colorValues.length).toBe(5);

        const shapeValues = new Array<Shape>();

        for (const shape of Shape.values())
        {
            expect(shape).toBeInstanceOf(Shape);

            shapeValues.push(shape);
        }

        expect(shapeValues.length).toBe(5);
    });

    it('should get entries', () =>
    {
        const permissionEntries = new Array<[number, Permission]>();

        for (const [key, value] of Permission.entries())
        {
            expect(key).toBeInstanceOf(Number);
            expect(value).toBeInstanceOf(Permission);

            permissionEntries.push([key, value]);
        }

        expect(permissionEntries.length).toBe(5);

        const colorEntries = new Array<[string, Color]>();

        for (const [key, value] of Color.entries())
        {
            expect(key).toBeInstanceOf(String);
            expect(value).toBeInstanceOf(Color);

            colorEntries.push([key, value]);
        }

        expect(colorEntries.length).toBe(5);

        const shapeEntries = new Array<[number, Shape]>();

        for (const [key, value] of Shape.entries())
        {
            expect(key).toBeInstanceOf(Number);
            expect(value).toBeInstanceOf(Shape);

            shapeEntries.push([key, value]);
        }

        expect(shapeEntries.length).toBe(5);
    });

    it('should get map', () =>
    {
        const permissionMap = Permission.map();

        expect(permissionMap.get(1)).toBe(Permission.None);
        expect(permissionMap.get(2)).toBe(Permission.View);
        expect(permissionMap.get(3)).toBe(Permission.Create);
        expect(permissionMap.get(4)).toBe(Permission.Edit);
        expect(permissionMap.get(5)).toBe(Permission.Delete);

        const colorMap = Color.map();

        expect(colorMap.get('Red')).toBe(Color.Red);
        expect(colorMap.get('Lime')).toBe(Color.Lime);
        expect(colorMap.get('Navy')).toBe(Color.Navy);
        expect(colorMap.get('Maroon')).toBe(Color.Maroon);
        expect(colorMap.get('Silver')).toBe(Color.Silver);

        const shapeMap = Shape.map();

        expect(shapeMap.get(1)).toBe(Shape.Triangle);
        expect(shapeMap.get(2)).toBe(Shape.Square);
        expect(shapeMap.get(3)).toBe(Shape.Pentagon);
        expect(shapeMap.get(4)).toBe(Shape.Hexagon);
        expect(shapeMap.get(5)).toBe(Shape.Heptagon);
    });

    it('should perform comparisons', () =>
    {
        expect(Permission.Create.eq(Permission.Create)).toBe(true);
        expect(Permission.Create == Permission.Create).toBe(true);
        expect(Permission.Create === Permission.Create).toBe(true);
        expect(Permission.Create.eq(Permission.View)).toBe(false);
        expect(Permission.Create == Permission.View).toBe(false);
        expect(Permission.Create === Permission.View).toBe(false);
        expect(Permission.Delete.neq(Permission.Delete)).toBe(false);
        expect(Permission.Delete != Permission.Delete).toBe(false);
        expect(Permission.Delete !== Permission.Delete).toBe(false);
        expect(Permission.Delete.neq(Permission.Create)).toBe(true);
        expect(Permission.Delete != Permission.Create).toBe(true);
        expect(Permission.Delete !== Permission.Create).toBe(true);
        expect(Permission.Create.gt(Permission.Delete)).toBe(false);
        expect(Permission.Create > Permission.Delete).toBe(false);
        expect(Permission.Create.gt(Permission.Edit)).toBe(false);
        expect(Permission.Create > Permission.Edit).toBe(false);
        expect(Permission.Edit.gte(Permission.Edit)).toBe(true);
        expect(Permission.Edit >= Permission.Edit).toBe(true);
        expect(Permission.View.gte(Permission.Edit)).toBe(false);
        expect(Permission.View >= Permission.Edit).toBe(false);
        expect(Permission.None.lt(Permission.View)).toBe(true);
        expect(Permission.None < Permission.View).toBe(true);
        expect(Permission.Edit.lt(Permission.View)).toBe(false);
        expect(Permission.Edit < Permission.View).toBe(false);
        expect(Permission.Edit.lte(Permission.Edit)).toBe(true);
        expect(Permission.Edit <= Permission.Edit).toBe(true);
        expect(Permission.Delete.lte(Permission.Edit)).toBe(false);
        expect(Permission.Delete <= Permission.Edit).toBe(false);

        expect(Color.Lime.eq(Color.Lime)).toBe(true);
        expect(Color.Lime == Color.Lime).toBe(true);
        expect(Color.Lime === Color.Lime).toBe(true);
        expect(Color.Lime.eq(Color.Maroon)).toBe(false);
        expect(Color.Lime == Color.Maroon).toBe(false);
        expect(Color.Lime === Color.Maroon).toBe(false);
        expect(Color.Maroon.neq(Color.Navy)).toBe(true);
        expect(Color.Maroon != Color.Navy).toBe(true);
        expect(Color.Maroon !== Color.Navy).toBe(true);
        expect(Color.Maroon.neq(Color.Maroon)).toBe(false);
        expect(Color.Maroon != Color.Maroon).toBe(false);
        expect(Color.Maroon !== Color.Maroon).toBe(false);
        expect(Color.Lime.gt(Color.Navy)).toBe(false);
        expect(Color.Lime > Color.Navy).toBe(false);
        expect(Color.Lime.gt(Color.Silver)).toBe(false);
        expect(Color.Lime > Color.Silver).toBe(false);
        expect(Color.Red.gte(Color.Navy)).toBe(true);
        expect(Color.Red >= Color.Navy).toBe(true);
        expect(Color.Red.gte(Color.Silver)).toBe(false);
        expect(Color.Red >= Color.Silver).toBe(false);
        expect(Color.Lime.lt(Color.Silver)).toBe(true);
        expect(Color.Lime < Color.Silver).toBe(true);
        expect(Color.Navy.lt(Color.Lime)).toBe(false);
        expect(Color.Navy < Color.Lime).toBe(false);
        expect(Color.Silver.lte(Color.Maroon)).toBe(false);
        expect(Color.Silver <= Color.Maroon).toBe(false);
        expect(Color.Lime.lte(Color.Silver)).toBe(true);
        expect(Color.Lime <= Color.Silver).toBe(true);

        expect(Shape.Triangle.eq(Shape.Triangle)).toBe(true);
        expect(Shape.Triangle == Shape.Triangle).toBe(true);
        expect(Shape.Triangle === Shape.Triangle).toBe(true);
        expect(Shape.Triangle.eq(Shape.Heptagon)).toBe(false);
        expect(Shape.Triangle == Shape.Heptagon).toBe(false);
        expect(Shape.Triangle === Shape.Heptagon).toBe(false);
        expect(Shape.Square.neq(Shape.Triangle)).toBe(true);
        expect(Shape.Square != Shape.Triangle).toBe(true);
        expect(Shape.Square !== Shape.Triangle).toBe(true);
        expect(Shape.Square.neq(Shape.Square)).toBe(false);
        expect(Shape.Square != Shape.Square).toBe(false);
        expect(Shape.Square !== Shape.Square).toBe(false);
        expect(Shape.Triangle.gt(Shape.Heptagon)).toBe(false);
        expect(Shape.Triangle > Shape.Heptagon).toBe(false);
        expect(Shape.Hexagon.gt(Shape.Square)).toBe(true);
        expect(Shape.Hexagon > Shape.Square).toBe(true);
        expect(Shape.Hexagon.gte(Shape.Hexagon)).toBe(true);
        expect(Shape.Hexagon >= Shape.Hexagon).toBe(true);
        expect(Shape.Square.gte(Shape.Hexagon)).toBe(false);
        expect(Shape.Square >= Shape.Hexagon).toBe(false);
        expect(Shape.Square.lt(Shape.Heptagon)).toBe(true);
        expect(Shape.Square < Shape.Heptagon).toBe(true);
        expect(Shape.Hexagon.lt(Shape.Triangle)).toBe(false);
        expect(Shape.Hexagon < Shape.Triangle).toBe(false);
        expect(Shape.Triangle.lte(Shape.Pentagon)).toBe(true);
        expect(Shape.Triangle <= Shape.Pentagon).toBe(true);
        expect(Shape.Pentagon.lte(Shape.Square)).toBe(false);
        expect(Shape.Pentagon <= Shape.Square).toBe(false);
    });

    it('should convert to primitive', () =>
    {
        expect(Permission.Create.valueOf()).toBe(Permission.Create.key);
        expect(Color.Red.valueOf()).toBe(Color.Red.key);
        expect(Shape.Triangle.valueOf()).toBe(Shape.Triangle.key);
    });

    it('should convert to string', () =>
    {
        expect(Permission.None.toString()).toBe('1');
        expect(Color.Red.toString()).toBe('Red');
        expect(Shape.Triangle.toString()).toBe('1');
    });

    it('should use overridden methods', () =>
    {
        const shape = Shape.Triangle;
        const context = {} as CanvasRenderingContext2D;

        expect(shape.draw(context)).toBe(context);
    });
});
