export interface IUsuario {
  id?:        number;
  nombre:    string;
  password:  string;
  username:  string;
  token?:     string;
  correo:    string;
  telefono:  string;
  apellidos: string;
  direccion: string;
  active:    boolean;
  role:      number;
}
export function CreateUsuario(options?: Partial<IUsuario>): IUsuario {
  const defaults = {
    id:        -1,
    nombre:    '',
    password:  '',
    username:  '',
    correo:    '',
    telefono:  '',
    apellidos: '',
    direccion: '',
    active:    false,
    role:      -1
  };

  return {
    ...defaults,
    ...options,
  };
}
