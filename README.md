# Implementación de operaciones CRUD en bases de datos SQL y NoSQL

El sistema requiere la implementación de operaciones CRUD (crear, leer, actualizar, eliminar) en bases de datos SQL y NoSQL. El dominio es una aplicación de gestión de inventarios donde se manejan productos con atributos como nombre, precio, stock y categoría. Se deben asegurar que los precios no sean negativos y que los nombres de los productos no se dupliquen. El sistema debe manejar correctamente los errores y casos borde del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 6 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación de operaciones CRUD en base de datos SQL

**Objetivo:** Implementar las operaciones CRUD en una base de datos SQL para gestionar productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseña y crea una tabla en la base de datos SQL para almacenar productos.
- Implementa las operaciones CRUD (crear, leer, actualizar, eliminar) para la tabla de productos.
- Asegúrate de que la validación de precios y nombres de productos se realice correctamente.

**Entregable:** Base de datos SQL con tabla de productos y operaciones CRUD implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza la definición y manipulación de datos (DDL y DML) para crear y gestionar la tabla.
- Aprovecha las herramientas de depuración como IntelliJ IDEA Debugger para verificar el correcto funcionamiento de las operaciones.

</details>

### Fase 2: Implementación de operaciones CRUD en base de datos NoSQL

**Objetivo:** Implementar las operaciones CRUD en una base de datos NoSQL para gestionar productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseña y crea una colección en la base de datos NoSQL para almacenar productos.
- Implementa las operaciones CRUD (crear, leer, actualizar, eliminar) para la colección de productos.
- Asegúrate de que la validación de precios y nombres de productos se realice correctamente.

**Entregable:** Base de datos NoSQL con colección de productos y operaciones CRUD implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza la definición y manipulación de datos (DDL y DML) para crear y gestionar la colección.
- Aprovecha las herramientas de depuración como IntelliJ IDEA Debugger para verificar el correcto funcionamiento de las operaciones.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en bases de datos SQL y NoSQL?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de una aplicación de gestión de inventarios?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD para gestionar productos en una base de datos?

## Criterios de Evaluacion

- Implementación correcta de la tabla en la base de datos SQL con operaciones CRUD.
- Implementación correcta de la colección en la base de datos NoSQL con operaciones CRUD.
- Validación correcta de precios y nombres de productos en ambas bases de datos.
- Uso adecuado de las herramientas de depuración para verificar el funcionamiento de las operaciones.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
