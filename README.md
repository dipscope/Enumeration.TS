# Enumeration.TS

![GitHub](https://img.shields.io/github/license/dipscope/Enumeration.TS) ![NPM](https://img.shields.io/npm/v/@dipscope/enumeration) ![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)

`Enumeration.TS` is a small but powerful package which brings support for type safe enums into `TypeScript`. Besides it provides you polymorphic support similar to regular classes to avoid `switch` cases and write better code.

## Give a star :star:

If you like or are using this project please give it a star. Thanks!

## Table of contents

* [What issues does it solve?](#what-issues-does-it-solve)
* [Installation](#installation)
* [Definition](#definition)
    * [Numeric enumeration](#numeric-enumeration)
    * [String enumeration](#string-enumeration)
    * [Polymorphic enumeration](#polymorphic-enumeration)
* [Static methods](#static-methods)
    * [Get](#get)
    * [Has](#has)
    * [Keys](#keys)
    * [Values](#values)
    * [Entries](#entries)
    * [Map](#map)
* [Instance methods](#instance-methods)
    * [Eq](#eq)
    * [Neq](#neq)
    * [Gt](#gt)
    * [Gte](#gte)
    * [Lt](#lt)
    * [Lte](#lte)
    * [ValueOf](#value-of)
    * [ToString](#to-string)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [Authors](#authors)
* [Notes](#notes)
* [License](#license)

## What issues does it solve?

Imagine that we are going to introduce simple coloring concept in our application. So simple that we can use an `Enum` to represent a list of available colors.

In `TypeScript` there are 2 types of `Enum`:

* Numeric based;
* String based;

For our first implementation we decided that using numeric based `Enum` is sufficient, so we ended up like this.

```typescript
export enum Color
{
    Red,
    Lime,
    Navy,
    Maroon,
    Silver
}
```

Some months later our management came to us and said that now we have to display available color names in the UI. Ok, this change looks simple so we decided to change our `Enum` to a string based and use item names in the UI.

```typescript
export enum Color
{
    Red = 'Red',
    Lime = 'Lime',
    Navy = 'Navy',
    Maroon = 'Maroon',
    Silver = 'Silver'
}
```

This works perfectly fine for a while and one day we have got a request to display `HEX` and `RGB` color codes so our `Enum` concept no longer works. We might ask our backend developer to introduce a list of colors somewhere in the database but such change will start bringing frontend related logic to the backend. Besides this list is static, so we might end up writing database migrations each time color property change. We dont want to be dependent from backend developers so end up using `switch` cases like this through newly introduced color service.

```typescript
export class ColorService
{
    public getHex(color: Color): string
    {
        switch (color)
        {
            case Color.Red:
                return '#FF0000';
            case Color.Lime:
                return '#00FF00';
            case Color.Navy:
                return '#000080';
            case Color.Maroon:
                return '#800000';
            case Color.Silver:
                return '#C0C0C0';
        }
    }

    public getRgb(color: Color): string
    {
        switch (color)
        {
            case Color.Red:
                return 'rgb(255, 0, 0)';
            case Color.Lime:
                return 'rgb(0, 255, 0)';
            case Color.Navy:
                return 'rgb(0, 0, 128)';
            case Color.Maroon:
                return 'rgb(128, 0, 0)';
            case Color.Silver:
                return 'rgb(192, 192, 192)';
        }
    }
}
```

No matter if it will be a backend change or a frontend one - we started introduce complexity to our application because of having behaviour for static items. Is there a way to simplify that?

Fortunately - yes. The pattern is called [enumeration classes](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/enumeration-classes-over-enum-types). We can replace `Enum` item with `Enum`-like class and keep behaviour inside it. Note that this pattern should be used only if you have some behaviour for `Enum` items. As you see we ended up writing a `switch` case so using this pattern might be a good option.

Let's use `Enumeration.TS` package and remove unnecessary `ColorService`. We have to define our color `Enum` like the following.

```typescript
import { Enumeration } from '@dipscope/enumeration';

export class Color extends Enumeration<Color, string>
{
    public static readonly Red: Color = new Color('Red', '#FF0000', 'rgb(255, 0, 0)');
    public static readonly Lime: Color = new Color('Lime', '#00FF00', 'rgb(0, 255, 0)');
    public static readonly Navy: Color = new Color('Navy', '#000080', 'rgb(0, 0, 128)');
    public static readonly Maroon: Color = new Color('Maroon', '#800000', 'rgb(128, 0, 0)');
    public static readonly Silver: Color = new Color('Silver', '#C0C0C0', 'rgb(192, 192, 192)');

    public readonly hex: string;
    public readonly rgb: string;

    public constructor(key: string, hex: string, rgb: string)
    {
        super(key);

        this.hex = hex;
        this.rgb = rgb;

        return;
    }
}
```

We extend base `Enumeration` class and specify that we are going to have enumeration of colors with a string based key. As now each enumeration item represents a class we added `hex` and `rgb` properties. Now all static information related to colors stored where it should be. By having a key attached to some entity or comming directly from the backend we can write our code like following.

```typescript
// Get a key from entity or backend. 
const key = ...; 

// Get type safe enumeration item by key.
const color = Color.get(key); 

// Get hex color code.
const hex = color.hex; 

// Get rgb color code.
const rgb = color.rgb;
```

This is a most basic sample of how implementation might looks like when using a library. It provides us several useful methods to work with such enumerations out of the box. Check [static methods](#static-methods) for more info. 

It is a great alternative for similar packages like [`Enumify`](https://github.com/rauschma/enumify). It covers all built in `Enum` features like numeric comparisons and brings [polymorphic support](#polymorphic-enumeration) to enumeration world.

Want to know more? Let's dive into the details.

## Installation

`Enumeration.TS` is available from NPM, both for browser (e.g. using webpack) and NodeJS:

```
npm i @dipscope/enumeration
```

This package has no dependencies so we can directly go to the definitions.

## Definition

We support all features available with regular `Enum` and a bit more. Lets go through the steps required to make use of enumeration classes.

### Numeric enumeration

If we have numeric based enum like the following.

```typescript
export enum Permission
{
    None,
    View,
    Create,
    Edit,
    Delete
}
```

It can be defined as following.

```typescript
import { Enumeration } from '@dipscope/enumeration';

export class Permission extends Enumeration<Permission, number> 
{
    public static readonly None: Permission = new Permission(1, 'None');
    public static readonly View: Permission = new Permission(2, 'View');
    public static readonly Create: Permission = new Permission(3, 'Create');
    public static readonly Edit: Permission = new Permission(4, 'Edit');
    public static readonly Delete: Permission = new Permission(5, 'Delete');

    public readonly name: string;

    public constructor(key: number, name: string)
    {
        super(key);

        this.name = name;

        return;
    }
}
```

In our case we extended it with string based name. If you are using compare operators for numeric `Enum` like `>`, `>=`, `<`, `<=` they are supported without any changes to the code as well as `==`, `!=`.

```typescript
// Get a user permission from somewhere.
const permission = Permission.Edit;

// Checks for permissions.
const gt = permission > Permission.View;
const lt = permission < Permission.Delete;
```

If you want to specify explicitly that such enumerations represents classes you are free to use [instance methods](#instance-methods).

```typescript
// Get a user permission from somewhere.
const permission = Permission.Edit;

// Checks using instance methods.
const gt = permission.gt(Permission.View);
const lt = permission.lt(Permission.Delete);
```

Instance methods are just a syntax sugar for compare operators.

### String enumeration

If we have string based enum like the following.

```typescript
export enum Color
{
    Red = 'Red',
    Lime = 'Lime',
    Navy = 'Navy',
    Maroon = 'Maroon',
    Silver = 'Silver'
}
```

It can be defined as following.

```typescript
import { Enumeration } from '@dipscope/enumeration';

export class Color extends Enumeration<Color, string>
{
    public static readonly Red: Color = new Color('Red', '#FF0000', 'rgb(255, 0, 0)');
    public static readonly Lime: Color = new Color('Lime', '#00FF00', 'rgb(0, 255, 0)');
    public static readonly Navy: Color = new Color('Navy', '#000080', 'rgb(0, 0, 128)');
    public static readonly Maroon: Color = new Color('Maroon', '#800000', 'rgb(128, 0, 0)');
    public static readonly Silver: Color = new Color('Silver', '#C0C0C0', 'rgb(192, 192, 192)');

    public readonly hex: string;
    public readonly rgb: string;

    public constructor(key: string, hex: string, rgb: string)
    {
        super(key);

        this.hex = hex;
        this.rgb = rgb;

        return;
    }
}
```

We extended base `Enum` with `hex` and `rgb` properties. We can also use compare operators similar to [numeric enumeration](#numeric-enumeration) if it makes sense in code. The behaviour will be the same as when we compare strings.

### Polymorphic enumeration

If we have an `Enum` with behaviour and extending it with properties is not enough we can go with polymorphic enumeration. It can be used with both numeric and string based keys. Imagine that we are working with shapes. Shapes are coming to us from the backend as a numeric static list.

```typescript
export enum Shape
{
    Triangle,
    Square,
    Pentagon,
    Hexagon,
    Heptagon
}
```

We decided to use enumeration class pattern as we have to draw this shapes somewhere in the UI and draw method contains some complex logic. We can declare each enumeration item as self sufficient class using following declaration.

```typescript
import { Enumeration, defer } from '@dipscope/enumeration';

export abstract class Shape extends Enumeration<Shape, number> 
{
    public static readonly Triangle: Shape = defer(() => new Triangle(1));
    public static readonly Square: Shape = defer(() => new Square(2));
    public static readonly Pentagon: Shape = defer(() => new Pentagon(3));
    public static readonly Hexagon: Shape = defer(() => new Hexagon(4));
    public static readonly Heptagon: Shape = defer(() => new Heptagon(5));

    public abstract draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
}

export class Triangle extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        // Draw triangle here...

        return context;
    }
}

export class Square extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        // Draw square here...

        return context;
    }
}

export class Pentagon extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        // Draw pentagon here...

        return context;
    }
}

export class Hexagon extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        // Draw hexagon here...

        return context;
    }
}

export class Heptagon extends Shape
{
    public draw(context: CanvasRenderingContext2D): CanvasRenderingContext2D 
    {
        // Draw heptagon here...

        return context;
    }
}
```

Now each enumeration item is declared like a class with behavior. We have to use `defer` function provided by the library to defer item initialization at a later time as at the moment of `Shape` class declaration our direct descendants are not defined. With such definition you can now call polymorphic methods in you code.

```typescript
// Get drawing context.
const context = new CanvasRenderingContext2D();

// Get enum as number from backend.
const shapeId = shapeService.getFirstShapeId();

// Get our shape.
const shape = Shape.get(shapeId);

// Draw our shape. 
shape.draw(context);
```

The behaviours of base enumeration and polymorphic one are absolutely the same. The only difference is calling `defer` function for a deferred initialization.

## Static methods

When we finish with our enumeration definitions we can start manipulating them. `Enumeration` class provides us several static methods to iterate over available items.

Let's take the following enumeration as an example.

```typescript
import { Enumeration } from '@dipscope/enumeration';

export class Color extends Enumeration<Color, string>
{
    public static readonly Red: Color = new Color('Red', '#FF0000', 'rgb(255, 0, 0)');
    public static readonly Lime: Color = new Color('Lime', '#00FF00', 'rgb(0, 255, 0)');
    public static readonly Navy: Color = new Color('Navy', '#000080', 'rgb(0, 0, 128)');
    public static readonly Maroon: Color = new Color('Maroon', '#800000', 'rgb(128, 0, 0)');
    public static readonly Silver: Color = new Color('Silver', '#C0C0C0', 'rgb(192, 192, 192)');
}
```

As you see this is a simple enumeration of colors with a string based key.

### Get

To get an instance of enumeration item call `get` method and provide a key associated with it.

```typescript
const key = 'Red';
const redColor = Color.get(key);
```

This call will return you an item if it is available or `undefined` if item with provided key is not present.

### Has

To check if enumeration has an item with a certain key call `has` method.

```typescript
const key = 'Red';
const hasRedColor = Color.has(key);
```

This call will return `true` if item with provided key exists and `false` otherwise.

### Keys

To get a list of all keys available call `keys` method.

```typescript
const colorKeys = Color.keys();
```

This call will return an iterator for all registered keys.

### Values

To get a list of all values available call `values` method.

```typescript
const colorValues = Color.values();
```

This call will return an iterator for all registered values.

### Entries

If you want to iterate over keys and values at the same time call `entries` method.

```typescript
const colorEntries = Color.entries();
```

This call will return a  key-value iterable for all registered items.

### Map

If you want to get a map of enumeration items call `map` method.

```typescript
const colorMap = Color.map();
```

This call will return a map of all registered items.

## Instance methods

There are several instance methods which base enumeration class provides. They are related mostly to compare operations and in most cases will not be used directly.

Let's take the following enumeration as an example.

```typescript
import { Enumeration } from '@dipscope/enumeration';

export class Permission extends Enumeration<Permission, number> 
{
    public static readonly None: Permission = new Permission(1, 'None');
    public static readonly View: Permission = new Permission(2, 'View');
    public static readonly Create: Permission = new Permission(3, 'Create');
    public static readonly Edit: Permission = new Permission(4, 'Edit');
    public static readonly Delete: Permission = new Permission(5, 'Delete');
}
```

As you see this is an enumeration of permissions with numeric based key.

### Eq

To check if one enumeration item equals another call `eq` method.

```typescript
const eq = permission.eq(Permission.Edit);
```

We can also simply write the following.

```typescript
const eq = permission === Permission.Edit;
```

This call will return `true` if enumeration item equals another and `false` otherwise.

### Neq

To check if one enumeration item not equals another call `neq` method.

```typescript
const neq = permission.neq(Permission.Edit);
```

We can also simply write the following.

```typescript
const neq = permission !== Permission.Edit;
```

This call will return `true` if enumeration item not equals another and `false` otherwise.

### Gt

To check if one enumeration item greater than another call `gt` method.

```typescript
const gt = permission.gt(Permission.View);
```

We can also simply write the following.

```typescript
const gt = permission > Permission.View;
```

This call will return `true` if enumeration item is greater than another and `false` otherwise.

### Gte

To check if one enumeration item greater than or equals another call `gte` method.

```typescript
const gte = permission.gte(Permission.View);
```

We can also simply write the following.

```typescript
const gte = permission >= Permission.View;
```

This call will return `true` if enumeration item is greater than or equals another and `false` otherwise.

### Lt

To check if one enumeration item lower than another call `lt` method.

```typescript
const lt = permission.lt(Permission.View);
```

We can also simply write the following.

```typescript
const lt = permission < Permission.View;
```

This call will return `true` if enumeration item is lower than another and `false` otherwise.

### Lte

To check if one enumeration item lower than or equals another call `lte` method.

```typescript
const lte = permission.lte(Permission.View);
```

We can also simply write the following.

```typescript
const lte = permission <= Permission.View;
```

This call will return `true` if enumeration item is lower than or equals another and `false` otherwise.

### ValueOf

To convert enumeration item into a primitive value call `valueOf` method.

```typescript
const value = permission.valueOf();
```

This call will convert a key to a primitive value. It is also called during compare operations.

### ToString

To convert enumeration item into string call `toString` method.

```typescript
const str = permission.toString();
```

This call will convert a key to a string representation.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the versions section on [NPM project page](https://www.npmjs.com/package/@dipscope/enumeration).

See information about breaking changes, release notes and migration steps between versions in [CHANGELOG.md](https://github.com/dipscope/Enumeration.TS/blob/main/CHANGELOG.md) file.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/dipscope/Enumeration.TS/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Dmitry Pimonov** - *Initial work* - [dpimonov](https://github.com/dpimonov)

See also the list of [contributors](https://github.com/dipscope/Enumeration.TS/contributors) who participated in this project.

## Notes

Thanks for checking this package.

Feel free to create an issue if you find any mistakes in documentation or have any improvements in mind.

We wish you good luck and happy coding!

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](https://github.com/dipscope/Enumeration.TS/blob/main/LICENSE.md) file for details.
