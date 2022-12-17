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
        expect(permissionX).toBe(Permission.none);
        expect(permissionX?.name).toBe('None');
        expect(permissionY).toBeUndefined();

        const colorX = Color.get('#800000');
        const colorY = Color.get('#453427');

        expect(colorX).toBeDefined();
        expect(colorX).toBeInstanceOf(Color);
        expect(colorX).toBe(Color.maroon);
        expect(colorX?.name).toBe('Maroon');
        expect(colorY).toBeUndefined();

        const shapeX = Shape.get(1);
        const shapeY = Shape.get(10);

        expect(shapeX).toBeDefined();
        expect(shapeX).toBeInstanceOf(Triangle);
        expect(shapeX).toBe(Shape.triangle);
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

        const hasColorX = Color.has('#C0C0C0');
        const hasColorY = Color.has('#C1C1C1');

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

        expect(permissionMap.get(1)).toBe(Permission.none);
        expect(permissionMap.get(2)).toBe(Permission.view);
        expect(permissionMap.get(3)).toBe(Permission.create);
        expect(permissionMap.get(4)).toBe(Permission.edit);
        expect(permissionMap.get(5)).toBe(Permission.delete);

        const colorMap = Color.map();

        expect(colorMap.get('#FF0000')).toBe(Color.red);
        expect(colorMap.get('#00FF00')).toBe(Color.lime);
        expect(colorMap.get('#000080')).toBe(Color.navy);
        expect(colorMap.get('#800000')).toBe(Color.maroon);
        expect(colorMap.get('#C0C0C0')).toBe(Color.silver);

        const shapeMap = Shape.map();

        expect(shapeMap.get(1)).toBe(Shape.triangle);
        expect(shapeMap.get(2)).toBe(Shape.square);
        expect(shapeMap.get(3)).toBe(Shape.pentagon);
        expect(shapeMap.get(4)).toBe(Shape.hexagon);
        expect(shapeMap.get(5)).toBe(Shape.heptagon);
    });

    it('should perform comparisons', () =>
    {
        expect(Permission.create.eq(Permission.create)).toBe(true);
        expect(Permission.create.eq(Permission.view)).toBe(false);
        expect(Permission.delete.neq(Permission.delete)).toBe(false);
        expect(Permission.delete.neq(Permission.create)).toBe(true);
        expect(Permission.create.gt(Permission.delete)).toBe(false);
        expect(Permission.create.gt(Permission.edit)).toBe(false);
        expect(Permission.edit.gte(Permission.edit)).toBe(true);
        expect(Permission.view.gte(Permission.edit)).toBe(false);
        expect(Permission.none.lt(Permission.view)).toBe(true);
        expect(Permission.edit.lt(Permission.view)).toBe(false);
        expect(Permission.edit.lte(Permission.edit)).toBe(true);
        expect(Permission.delete.lte(Permission.edit)).toBe(false);

        expect(Color.lime.eq(Color.lime)).toBe(true);
        expect(Color.lime.eq(Color.maroon)).toBe(false);
        expect(Color.maroon.neq(Color.navy)).toBe(true);
        expect(Color.maroon.neq(Color.maroon)).toBe(false);
        expect(Color.lime.gt(Color.navy)).toBe(true);
        expect(Color.lime.gt(Color.silver)).toBe(false);
        expect(Color.red.gte(Color.navy)).toBe(true);
        expect(Color.red.gte(Color.silver)).toBe(true);
        expect(Color.lime.lt(Color.silver)).toBe(true);
        expect(Color.navy.lt(Color.lime)).toBe(true);
        expect(Color.silver.lte(Color.maroon)).toBe(false);
        expect(Color.lime.lte(Color.silver)).toBe(true);

        expect(Shape.triangle.eq(Shape.triangle)).toBe(true);
        expect(Shape.triangle.eq(Shape.heptagon)).toBe(false);
        expect(Shape.square.neq(Shape.triangle)).toBe(true);
        expect(Shape.square.neq(Shape.square)).toBe(false);
        expect(Shape.triangle.gt(Shape.heptagon)).toBe(false);
        expect(Shape.hexagon.gt(Shape.square)).toBe(true);
        expect(Shape.hexagon.gte(Shape.hexagon)).toBe(true);
        expect(Shape.square.gte(Shape.hexagon)).toBe(false);
        expect(Shape.square.lt(Shape.heptagon)).toBe(true);
        expect(Shape.hexagon.lt(Shape.triangle)).toBe(false);
        expect(Shape.triangle.lte(Shape.pentagon)).toBe(true);
        expect(Shape.pentagon.lte(Shape.square)).toBe(false);
    });

    it('should convert to string', () =>
    {
        expect(Permission.none.toString()).toBe('1');
        expect(Color.red.toString()).toBe('#FF0000');
        expect(Shape.triangle.toString()).toBe('1');
    });

    it('should use overridden methods', () =>
    {
        const shape = Shape.triangle;
        const context = {} as CanvasRenderingContext2D;

        expect(shape.draw(context)).toBe(context);
    });
});
