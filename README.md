# Boat Frontend - Angular Standalone App

Cette application Angular permet de gérer une flotte de bateaux. Elle est connectée à un backend Spring Boot sécurisé via JWT et utilise Angular Material pour une interface moderne et responsive.

## Stack technique

- Angular 19+ (Standalone Components)
- Angular Material
- RxJS
- JWT Auth (avec `HttpInterceptor`)
- Responsive Design
- Formulaires réactifs (Reactive Forms)
- Routing avec guards (`authGuard`)
- API REST Spring Boot

---

## Lancer l'application

### Prérequis

- Node.js 22+
- Angular CLI (`npm install -g @angular/cli`)
- Le backend doit être lancé séparément (voir `boat-api`)

### Installation

1. Clone du projet depuis Github

```
git clone https://github.com/ombinte1280/boat-frontend.git
```
2. Installation des packages

```
npm install
```

3. Run project

```
ng serve
```

