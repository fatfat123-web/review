<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    overflow: hidden;
  }

  i, em {
    font-style: normal;
  }

  a {
    text-decoration: none;

  }

  a:hover {
    color: black;
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

  }

  button {
    outline: none;
  }

  * {
    margin: 0;
    padding: 0
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;

  }

  img {
    display: block;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100vh;
  }

  input, textarea {
    outline: none;
    border: none;
  }

  input {
    outline: none
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

</style>
