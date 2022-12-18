import { Enumeration } from '../../src';

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
