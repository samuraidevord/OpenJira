# Next.js OpenJira App 

Para correr la aplicación localmente, se necesita la base de datos

```
docker-compose up -d
```

* El  -d, significa __detached__.

MondoDB yrl Local: 

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el arhivo __.env.template__ a __.env__

## Llenar la base de datos con información de pruebas 

LLamar: 
```
http://localhost:3000/api/seed
```