# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Date:18-11-2024

- made a navbar simple design
- implement getting location by lat and long using navigator
- implement public api hitting of swiggy and getting data based on lat and long
  - error: getting cors error so installed allows cors from my side using chrome extention
- implement api fetch on change of lat and long from local-storage