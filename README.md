# BIANES — Soluções Digitais

Website institucional da BIANES: criação e melhoria de produtos tecnológicos, em todo e qualquer setor.

Site estático (HTML, CSS e JavaScript), sem dependências nem build.

## Ver localmente

```bash
python -m http.server 5173
```

Depois abrir http://localhost:5173.

## Estrutura

- `index.html`: conteúdo e secções (Serviços, Setores, Processo, Sobre, Contacto)
- `styles.css`: estilos e versão móvel
- `script.js`: menu móvel, animações e formulário de contacto
- `assets/`: logótipo e favicon

O formulário de contacto abre o email do visitante já preenchido. O endereço de destino está em `CONTACT_EMAIL`, no topo de `script.js`.
