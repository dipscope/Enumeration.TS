import { Enumeration } from '../../src';

export class Permission extends Enumeration<Permission, number> 
{
    public static readonly none: Permission = new Permission(1, 'None');
    public static readonly view: Permission = new Permission(2, 'View');
    public static readonly create: Permission = new Permission(3, 'Create');
    public static readonly edit: Permission = new Permission(4, 'Edit');
    public static readonly delete: Permission = new Permission(5, 'Delete');

    public readonly name: string;

    public constructor(key: number, name: string)
    {
        super(key);

        this.name = name;

        return;
    }
}
