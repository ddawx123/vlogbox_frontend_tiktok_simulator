### 个人Vlog网站-仿抖音前端服务

### 后端访问端点配置路径
```zsh
#!/bin/zsh
vim src/utils/axios.ts
```

### 服务构建工具
- NodeJS 13.14.0 (TypeScript)
- React 17.0.1
- React Router 5.2.0

### 路由方式
- HashRouter 
  - 如需调整为History模式请修改`src/App.tsx`的HashRouter为BrowserRouter

### 服务启动与部署
- 调试启动：`npm run dev`
- 测试服务：`npm run test`
- 生产打包：`npm run build`

### 特别提醒
- Chromium 94+ 内核浏览器或其他同时期之后的浏览器，如内网部署需重设 insecure private network requests 选项
- Chromium设置方法：访问`chrome://flags`，其他浏览器调整方法参见其文档
