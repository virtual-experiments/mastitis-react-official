/* Creative Commons Attribution 4.0 International (CC-BY-4.0) */
/* Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) */
/* This source code was getting from https://github.com/tastejs/todomvc-app-css/blob/03e753aa21bd555cbdc2aa09185ecb9905d1bf16/index.css */

import styled, { css } from 'styled-components'

export const Layout = styled.div`
  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .info p {
    line-height: 1;
  }

  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  .info a:hover {
    text-decoration: underline;
  }

  .leftContent {
    width: 300px;
    position: fixed;
    overflow: scroll;
    top: 0;
  bottom: 1px; 
    border-right: 6px solid black;
    background-color: #FFF;
  }

  .rightContent {
    margin-left: 200px;
    flex-grow: 1;
    // flex:1 1 1;
    background-color: #FFF;
    
  }

  .column-layout {
    //max-width: 1600px;
    background-color: #FFF;
    margin: 0 auto 0 auto;
    line-height: 1.65;
    padding: 0 0;
    display: flex;
    flex-grow: 1;
  }
`