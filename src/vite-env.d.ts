/*
 * @Author: WH
 * @Date: 2024-03-24 10:58:35
 * @Description: 
 * @LastEditTime: 2024-03-24 15:51:31
 * @LastEditors:  
 */
/// <reference types="vite/client" />
declare interface ImportMetaEnv {
    readonly VITE_BASE: string;
    readonly VITE_API_BASEURL: string;
    readonly VITE_APP_TITLE: string;
    // 更多环境变量...
  }
  
declare global {
  declare interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
  