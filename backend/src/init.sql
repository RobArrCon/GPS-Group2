CREATE TABLE Receta (
  codigo_receta INT NOT NULL,
  nombre_receta VARCHAR(100),
  preparacion  TEXT,
  PRIMARY KEY (codigo_receta)
  );

CREATE TABLE Categoria (
  nombre_categoria VARCHAR(45),
  descripcion_categoria VARCHAR(45),
  PRIMARY KEY (nombre_categoria )
);

CREATE TABLE Usuario (
  nombre_usuario VARCHAR(45) NOT NULL,
  correo VARCHAR(45),
  clave_user VARCHAR(45),
  rol_user VARCHAR(45),
  PRIMARY KEY (nombre_usuario )
  );

  CREATE TABLE Ingrediente (
  codigo_ingrediente INT NOT NULL,
  nombre_ingrediente VARCHAR(45),
  descripcion_ingrediente VARCHAR(45),
  categoria_ingrediente VARCHAR(45),
  PRIMARY KEY (codigo_ingrediente)
  );

CREATE TABLE Producto (
  codigo_producto INT NOT NULL,
  nombre_producto VARCHAR(45),
  descripcion_producto VARCHAR(200),
  informacion_nutricional VARCHAR(100),
  nombre_categoria  VARCHAR(45) NOT NULL,
  PRIMARY KEY (codigo_producto),
  FOREIGN KEY ( nombre_categoria) REFERENCES Categoria ( nombre_categoria)
);

CREATE TABLE Opinion (
  nombre_usuario VARCHAR(45) NOT NULL,
  codigo_producto INT NOT NULL,
  detalle_opinion VARCHAR(100),
  fecha_opinion DATE,
  num_valoracion INT,
  PRIMARY KEY (nombre_usuario , codigo_producto),
  FOREIGN KEY (nombre_usuario ) REFERENCES Usuario (nombre_usuario ),
  FOREIGN KEY (codigo_producto) REFERENCES Producto (codigo_producto)
);

CREATE TABLE Post (
  codigo_post INT NOT NULL,
  titulo_post VARCHAR(45),
  detalle_post VARCHAR(100),
  fecha_publicacion DATE,
  nombre_usuario VARCHAR(45) NOT NULL,
  PRIMARY KEY (codigo_post),
  FOREIGN KEY (nombre_usuario ) REFERENCES Usuario (nombre_usuario )
  );

CREATE TABLE Comentario (
  nombre_usuario VARCHAR(45) NOT NULL,
  codigo_post INT NOT NULL,
  detalle_comentario VARCHAR(100),
  fecha_comentario DATE,
  PRIMARY KEY (nombre_usuario, codigo_post),
  FOREIGN KEY (nombre_usuario ) REFERENCES Usuario (nombre_usuario ),
  FOREIGN KEY (codigo_post) REFERENCES Post (codigo_post)
);

CREATE TABLE ListaCompra (
  codigo_lista INT NOT NULL,
  nombre_lista VARCHAR(45) NULL,
  nombre_usuario VARCHAR(45) NOT NULL,
  PRIMARY KEY (codigo_lista),
  FOREIGN KEY (nombre_usuario ) REFERENCES Usuario (nombre_usuario )
  );


CREATE TABLE Producto_IN_ListaCompra (
  codigo_producto INT NOT NULL,
  codigo_lista INT NOT NULL,
  PRIMARY KEY (codigo_producto, codigo_lista),
  FOREIGN KEY (codigo_producto) REFERENCES Producto (codigo_producto),
  FOREIGN KEY (codigo_lista) REFERENCES ListaCompra (codigo_lista)
  );


CREATE TABLE Producto_IN_Receta (
  codigo_producto INT NOT NULL,
  codigo_receta INT NOT NULL,
  PRIMARY KEY (codigo_producto, codigo_receta),
  FOREIGN KEY (codigo_producto) REFERENCES Producto (codigo_producto),
  FOREIGN KEY (codigo_receta) REFERENCES Receta (codigo_receta)
  );

CREATE TABLE Ingrediente_IN_Producto(
 codigo_producto INT NOT NULL,
 codigo_ingrediente INT NOT NULL,
 PRIMARY KEY (codigo_producto, codigo_ingrediente),
 FOREIGN KEY (codigo_producto) REFERENCES Producto (codigo_producto),
 FOREIGN KEY (codigo_ingrediente) REFERENCES Ingrediente (codigo_ingrediente)
 );
