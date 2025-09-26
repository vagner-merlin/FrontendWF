# WF Finanza - Frontend React

Sistema de autenticación y dashboard para WF Finanza con integración completa al backend Django.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend Django corriendo en puerto 8000

### Instalación en nueva computadora

1. **Clonar/copiar el proyecto**
   ```bash
   git clone [tu-repositorio] 
   # o copiar la carpeta del proyecto
   ```

2. **Instalar dependencias**
   ```bash
   cd frontendWF
   npm install
   ```

3. **Configurar URL del backend (si es necesario)**
   
   Si tu backend corre en un puerto diferente al 8000, edita el archivo:
   ```
   src/config/api.js
   ```
   
   Y cambia las URLs:
   ```javascript
   export const API_CONFIG = {
       BASE_URL: 'http://127.0.0.1:8080',  // Cambiar puerto aquí
       API_URL: 'http://127.0.0.1:8080/api',
       ADMIN_URL: 'http://127.0.0.1:8080/admin'
   };
   ```

4. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

## 🔗 APIs Utilizadas

El frontend se conecta automáticamente a estas rutas del backend:

- **Login**: `POST /api/login/`
- **Registro**: `POST /api/register/`
- **Perfil**: `GET /api/profile/`
- **Logout**: `POST /api/logout/`
- **Admin Django**: `/admin/`

## 📱 Características

### ✅ Login y Registro
- Formulario animado con diseño profesional
- Validación de campos
- Manejo de errores
- Diseño responsive

### ✅ Dashboard Moderno
- 4 secciones principales:
  - **Home**: Bienvenida y acceso a admin
  - **Información Personal**: Datos del usuario
  - **Información de la Empresa**: Datos empresariales
  - **Estado de Créditos**: Sistema de créditos

### ✅ Seguridad
- Manejo automático de tokens JWT
- Rutas protegidas
- Persistencia de sesión
- Logout seguro

### ✅ Responsive Design
- Funciona en desktop, tablet y móvil
- Colores verde claro y blanco
- Diseño moderno y limpio

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   ├── AuthForm.jsx          # Login y registro
│   ├── Dashboard.jsx         # Panel principal
│   ├── Loading.jsx          # Componente de carga
│   └── PrivateRoute.jsx     # Rutas protegidas
├── context/
│   └── AuthContext.jsx      # Manejo de autenticación
├── config/
│   └── api.js              # Configuración de URLs
└── styles/
    └── auth.css            # Estilos principales
```

## 🎨 Personalización

### Cambiar colores
Edita el archivo `src/styles/auth.css` y modifica las variables de color.

### Cambiar imágenes de fondo
Reemplaza los archivos en `public/`:
- `login.jpg` - Imagen del login
- `home.jpg` - Imagen del dashboard

## 🐛 Troubleshooting

### Error de CORS
Si tienes problemas de CORS, asegúrate que tu backend Django tenga configurado:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Puerto de Vite
    "http://127.0.0.1:5173",
]
```

### Backend no responde
Verifica que tu servidor Django esté corriendo:
```bash
python manage.py runserver
```

### Puerto ocupado
Si el puerto 5173 está ocupado, Vite automáticamente buscará otro puerto disponible.

## 📋 Campos de Registro

El formulario de registro envía estos campos al backend:

```json
{
    "username": "admin_test",
    "email": "admin@test.com", 
    "password": "mipassword123",
    "name": "Test Company S.A.",
    "telefono_ref": "123456789",
    "email_empresarial": "contacto@testcompany.com",
    "nombre_completo": "Juan Pérez González",
    "direccion": "Av. Principal 123, Lima",
    "telefono": "987654321"
}
```

## ✅ Listo para Producción

Este proyecto está listo para:
- ✅ Ejecutarse en cualquier computadora
- ✅ Conectarse automáticamente al backend
- ✅ Manejar usuarios y sesiones
- ✅ Responsive design
- ✅ Manejo de errores

Solo necesitas hacer `npm install` y `npm run dev` en la nueva computadora!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
