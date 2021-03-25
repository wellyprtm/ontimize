export class UserRole {

  public static readonly SUPER_USER = 'SuperUser';
  public static readonly PROGRAMMER  = 'Programmer';
  public static readonly TRANSLATOR  = 'Translator';

  public static readonly values = [
    { value: UserRole.SUPER_USER, label: 'Super User' },
    { value: UserRole.PROGRAMMER, label: 'Programmer' },
    { value: UserRole.TRANSLATOR, label: 'Translator' },
  ];
}
