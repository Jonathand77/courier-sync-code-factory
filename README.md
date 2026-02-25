# **📘 CourierSync - Sistema Web para Optimización de Procesos Logísticos**

---

## 🛠️ Stack tecnológico y Arquitectura

![Next.js](https://img.shields.io/badge/Next.js-14+-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?logo=tailwindcss)
![Architecture](https://img.shields.io/badge/Architecture-Frontend%20Modular-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)
![Code Quality](https://img.shields.io/badge/Code%20Quality-ESLint-success)
![GitHub repo size](https://img.shields.io/github/repo-size/Jonathand77/courier-sync-code-factory)
![GitHub contributors](https://img.shields.io/github/contributors/Jonathand77/courier-sync-code-factory)
![GitHub last commit](https://img.shields.io/github/last-commit/Jonathand77/courier-sync-code-factory)
![Languages](https://img.shields.io/github/languages/count/Jonathand77/courier-sync-code-factory)

---

## 👤 Autor

| 👨‍💻 Nombre | 📧 Correo | 🏫 Link directo al repositorio | 🐙 Usuario GitHub |
|---|---|---|---|
| **Jonathan David Fernandez Vargas** | jonathanfdez62@gmail.com | [LinkRepositorio](https://github.com/Jonathand77/courier-sync-code-factory) | [jonathand77](https://github.com/jonathand77) |

---

## 1. 🔍 Introducción

CourierSync es un sistema web orientado a optimizar los procesos de transporte y distribución de la empresa, incrementando la eficiencia operativa, reduciendo tiempos de gestión y mejorando la experiencia del cliente mediante automatización, trazabilidad y análisis de datos en tiempo real.

Este repositorio corresponde al frontend desarrollado con Next.js, TypeScript y Tailwind CSS, enfocado en la **Feature 4: Control de Inventario en Tránsito**.

---

## 2. 🎯 Objetivo General

Desarrollar un sistema web que optimice los procesos logísticos de transporte y distribución, facilitando la gestión de paquetes en tránsito con una experiencia de usuario clara, rápida y escalable.

---

## 3. 📋 Funcionalidades Principales

### **Feature 4. Control de Inventario en Tránsito**

- Monitoreo de paquetes en todas las etapas del transporte para minimizar pérdidas y errores.
- **Autenticación y Autorización:** acceso exclusivo para personal de almacén y logística.
- **Registro de Paquetes (CRUD):** ingreso y modificación de datos de paquetes en tránsito (código, estado, ubicación).
- **Actualización de Ubicación (CRUD):** registro de la ubicación actual del paquete mediante escaneo o GPS.
- **Alerta de Incidencias:** notificación inmediata ante extravíos, daños o retrasos detectados.
- **Reporte de Inventario:** resumen del estado actual del inventario en tránsito.

---

## 4. ⚙️ Tecnologías Utilizadas

### 💻 Frontend

- Next.js
- Tailwind CSS
- TypeScript
- Iconos (especificar la librería de iconos usada, por ejemplo, Lucide React o Font Awesome)

---

## 5. 📦 Estructura del Proyecto

```bash
App/
│
├───components/          # Componentes de la interfaz de usuario
│   ├───Login.tsx        # Componente para la vista de inicio de sesión
│   ├───Menu.tsx         # Componente para el menú de navegación
│   ├───Registro.tsx     # Componente para la vista de registro de usuarios
│   └───Inventario.tsx   # Componente para la vista de gestión de inventario
```

---

## 6. 🚀 Despliegue

- **Integración Continua/Entrega Continua (CI/CD):** GitHub Actions
- **Plataforma de Despliegue:** Vercel

---

## 7. 🖥️ Guía Paso a Paso para la Ejecución

### 7.1 Requisitos Previos

- Node.js instalado en tu sistema.
- npm o yarn instalado.
- Acceso a un repositorio de GitHub (para clonar el proyecto).
- Vercel CLI (opcional, para despliegue local y pruebas).

### 7.2 Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/Jonathand77/courier-sync-code-factory
cd courier-sync-code-factory
```

### 7.3 Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 7.4 Configurar Variables de Entorno (si es necesario)

Si tu proyecto requiere variables de entorno (como claves de API, URLs de bases de datos, etc.), crea un archivo `.env.local` en la raíz del proyecto y define las variables necesarias. Por ejemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Asegúrate de consultar la documentación del proyecto o los archivos de configuración para conocer las variables específicas que se requieren.

### 7.5 Ejecutar la Aplicación en Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre `http://localhost:3000` con tu navegador para ver el resultado.

Puedes empezar a editar la página modificando `app/page.tsx`. La vista se actualiza automáticamente conforme guardas cambios.

### 7.6 Despliegue en Vercel (Opcional)

- **Instalar Vercel CLI (si no lo has hecho):**

```bash
npm install -g vercel
# o
yarn global add vercel
```

- **Iniciar sesión en Vercel:**

```bash
vercel login
```

- **Desplegar el proyecto:**

```bash
vercel
```

Vercel te guiará en el proceso de configuración y despliegue. Asegúrate de que `vercel.json` esté correctamente configurado.

- **Previsualizar el proyecto localmente:**

```bash
vercel dev
```

---

## 8. ⚙️ GitHub Actions

El proyecto está configurado con GitHub Actions para CI/CD. Cada cambio en el repositorio puede disparar automáticamente procesos de validación y despliegue en Vercel.

- **Workflow:** definido en `.github/workflows/main.yml` (o similar).
- **Acciones típicas del workflow:**
  - `npm install` o `yarn install`
  - `npm run build` o `yarn build`
  - `vercel deploy --prebuilt`
- **Despliegue automático:** configurado para ejecutarse en push a la rama principal (o la rama definida por tu estrategia).
- **Estado del workflow:** visible en la pestaña **Actions** del repositorio en GitHub.

---

## 9. 🤝 Contribución

Si eres parte de Fábrica Escuela, las contribuciones son bienvenidas.

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b mi-funcionalidad`).
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube los cambios a la rama (`git push origin mi-funcionalidad`).
5. Crea un Pull Request.

---

## 10. 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT. Revisa el archivo [LICENSE](LICENSE) para más detalles.

---

## 11. 🎁 Agradecimientos

- Comparte este proyecto con otras personas 📢
- Da las gracias públicamente 🤓

---

## 12. 📚 Recursos

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [Aprende Next.js](https://nextjs.org/learn)
- [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js)
- [Documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying)

---

## **Fin de la guía del proyecto CourierSync.**