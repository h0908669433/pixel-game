# Pixel Art Quiz Game

這是一個 2000 年代街機風格 (Pixel Art) 的闖關問答遊戲。前端使用 React (Vite) 搭配 `nes.css`，後端使用 Google Apps Script (GAS) 儲存資料到 Google Sheets。

## 本機開發

1. 安裝相依套件：
   ```bash
   npm install
   ```
2. 複製環境變數範例檔，並填寫你的 GAS 網址：
   ```bash
   cp .env.example .env
   ```
3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

## 自動部署到 GitHub Pages

本專案已設定好 GitHub Actions，當你推送到 `main` 分支時，會自動建置並部署到 GitHub Pages。

### 部署前置設定 (Secrets)

由於這是一個靜態網站 (SPA)，Vite 在 `build` 階段需要把環境變數寫死到檔案中。你必須在 GitHub 的儲存庫設定環境變數 Secrets，以便 Actions 能讀取到。

1. 進入你的 GitHub Repository 頁面。
2. 點擊上方的 **Settings** 頁籤。
3. 在左側選單找到 **Secrets and variables** -> **Actions**。
4. 點擊 **New repository secret**，新增以下三個環境變數（參考 `.env.example`）：
   - `VITE_GOOGLE_APP_SCRIPT_URL`：(必填) 你的 GAS 網頁應用程式 URL。
   - `VITE_PASS_THRESHOLD`：(選填，預設為 3) 通關門檻。
   - `VITE_QUESTION_COUNT`：(選填，預設為 5) 題目數量。

### 開啟 GitHub Pages 功能

1. 進入 **Settings** 頁籤。
2. 在左側選單找到 **Pages**。
3. 在 **Build and deployment** 區塊，將 Source 設定為 **GitHub Actions**。

### 觸發部署 

只要你將程式碼推送到 `main` 分支，GitHub Actions 就會自動開始建置並部署。你可以在儲存庫的 **Actions** 頁籤中查看進度。部署成功後，GitHub 會提供一組 `https://<你的帳號>.github.io/<專案名稱>/` 的網址供你遊玩！ 
