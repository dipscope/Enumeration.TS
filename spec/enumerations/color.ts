import { Enumeration } from '../../src';

export class Color extends Enumeration<Color, string>
{
    public static readonly red: Color = new Color('#FF0000', 'rgb(255, 0, 0)', 'Red');
    public static readonly lime: Color = new Color('#00FF00', 'rgb(0, 255, 0)', 'Lime');
    public static readonly navy: Color = new Color('#000080', 'rgb(0, 0, 128)', 'Navy');
    public static readonly maroon: Color = new Color('#800000', 'rgb(128, 0, 0)', 'Maroon');
    public static readonly silver: Color = new Color('#C0C0C0', 'rgb(192, 192, 192)', 'Silver');

    public readonly rgb: string;
    public readonly name: string;

    public constructor(key: string, rgb: string, name: string)
    {
        super(key);

        this.rgb = rgb;
        this.name = name;

        return;
    }
}
