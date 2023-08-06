export interface IUsuario {
  id:        number;
  nombre:    string;
  password:  string;
  username:  string;
  token:     string;
  correo:    string;
  telefono:  string;
  apellidos: string;
  direccion: string;
  active:    boolean;
  role:      number;
}
