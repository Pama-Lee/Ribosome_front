Language : [๐บ๐ธ](./README.md) | [๐จ๐ณ](./README.zh-CN.md) | [๐ท๐บ](./README.ru-RU.md) | [๐น๐ท](./README.tr-TR.md) | ๐ฏ๐ต | [๐ซ๐ท](./README.fr-FR.md) | [๐ต๐น](./README.pt-BR.md) | [๐ธ๐ฆ](./README.ar-DZ.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

็ฌๅต็ใชๆฅญๅใทในใใ ใฎ UI ใ่งฃๆฑบใใใใใฎ React ใใคใฉใผใใฌใผใใ

[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) [![Build Status](https://dev.azure.com/ant-design/ant-design-pro/_apis/build/status/ant-design.ant-design-pro?branchName=master)](https://dev.azure.com/ant-design/ant-design-pro/_build/latest?definitionId=1?branchName=master) [![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro) [![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev) [![Gitter](https://img.shields.io/gitter/room/ant-design/pro-english.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgNzQxMCAzOTAwIj4NCjxyZWN0IHdpZHRoPSI3NDEwIiBoZWlnaHQ9IjM5MDAiIGZpbGw9IiNiMjIyMzQiLz4NCjxwYXRoIGQ9Ik0wLDQ1MEg3NDEwbTAsNjAwSDBtMCw2MDBINzQxMG0wLDYwMEgwbTAsNjAwSDc0MTBtMCw2MDBIMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMwMCIvPg0KPHJlY3Qgd2lkdGg9IjI5NjQiIGhlaWdodD0iMjEwMCIgZmlsbD0iIzNjM2I2ZSIvPg0KPGcgZmlsbD0iI2ZmZiI%2BDQo8ZyBpZD0iczE4Ij4NCjxnIGlkPSJzOSI%2BDQo8ZyBpZD0iczUiPg0KPGcgaWQ9InM0Ij4NCjxwYXRoIGlkPSJzIiBkPSJNMjQ3LDkwIDMxNy41MzQyMzAsMzA3LjA4MjAzOSAxMzIuODczMjE4LDE3Mi45MTc5NjFIMzYxLjEyNjc4MkwxNzYuNDY1NzcwLDMwNy4wODIwMzl6Ii8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHk9Ijg0MCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTI2MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTY4MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjczQiIHg9IjI0NyIgeT0iMjEwIi8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzOSIgeD0iNDk0Ii8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzMTgiIHg9Ijk4OCIvPg0KPHVzZSB4bGluazpocmVmPSIjczkiIHg9IjE5NzYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3M1IiB4PSIyNDcwIi8%2BDQo8L2c%2BDQo8L3N2Zz4%3D)](https://gitter.im/ant-design/pro-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Join the chat at https://gitter.im/ant-design/ant-design-pro](https://img.shields.io/gitter/room/ant-design/ant-design-pro.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAzMCAyMCI%2BDQo8ZGVmcz4NCjxwYXRoIGlkPSJzIiBkPSJNMCwtMSAwLjU4Nzc4NSwwLjgwOTAxNyAtMC45NTEwNTcsLTAuMzA5MDE3SDAuOTUxMDU3TC0wLjU4Nzc4NSwwLjgwOTAxN3oiIGZpbGw9IiNmZmRlMDAiLz4NCjwvZGVmcz4NCjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RlMjkxMCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSw1KSBzY2FsZSgzKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMikgcm90YXRlKDIzLjAzNjI0MykiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDQpIHJvdGF0ZSg0NS44Njk4OTgpIi8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiw3KSByb3RhdGUoNjkuOTQ1Mzk2KSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsOSkgcm90YXRlKDIwLjY1OTgwOCkiLz4NCjwvc3ZnPg%3D%3D)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) ![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label) ![Github Action](https://github.com/ant-design/ant-design-pro/workflows/Node%20CI/badge.svg)

![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- ใใฌใใฅใผ: http://preview.pro.ant.design
- ใใผใ ใใผใธ: http://pro.ant.design
- ใใญใฅใกใณใ: http://pro.ant.design/docs/getting-started
- ๅคๆดใญใฐ: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq
- ไธญๅฝใฎใใฉใผใตใคใ: http://ant-design-pro.gitee.io

## 2.0 ใใชใชใผในใใใพใใ ๐๐๐

[Announcing Ant Design Pro 2.0.0](https://medium.com/ant-design/beautiful-and-powerful-ant-design-pro-2-0-release-51358da5af95)

## ็ฟป่จณใฎๅ้ :loudspeaker:

็งใใกใฏใใชใใฎๅฉใใๅฟ่ฆใจใใฆใใพใใ: https://github.com/ant-design/ant-design-pro/issues/120

## ็นๅพด

- :gem: **ใใกใใจใใใใถใคใณ**: [Ant Design specification](http://ant.design/) ใซๅพใฃใฆใใ ใ ใใ
- :triangular_ruler: **ๅฑ้ใฎใใณใใฌใผใ**: ๆฅญๅใทในใใ ็จใฎใใณใใฌใผใ
- :rocket: **็พ็ถใฎใขใผใ้็บ**: `React/umi/dva/antd` ใฎๆๆฐ้็บในใฟใใฏ
- :iphone: **ใฌในใใณใทใ**: ใใพใใพใช็ป้ขใตใคใบ็จใฎ่จญ่จ
- :art: **ใใผใ**: ใทใณใใซใช่จญๅฎใงใซในใฟใใคใบๅฏ่ฝใชใใผใ
- :globe_with_meridians: **ๅฝ้ๅ**: ๅฝ้ๅใฎ่งฃๆฑบ็ญใๅ่ต
- :gear: **ใในใใใฉใฏใใฃใน**: ใณใผใใ็พใใใใใใใฎๆญฃใใใฏใผใฏใใญใผ
- :1234: **ใขใใฏ้็บ**: ไฝฟใใใใใขใใฏ้็บ
- :white_check_mark: **UI ใในใ**: ใฆใใใใในใใจ e2e ใในใ

## ใใณใใฌใผใ

```
- ใใใทใฅใใผใ
  - ใขใใชใใฃใฏใน
  - ใขใใฟใผ
ย ย - ใฏใผใฏในใใผใน
- ๅฝข
ย ย - ๅบๆฌใใฉใผใ 
ย ย - ในใใใใใฉใผใ 
ย ย - ้ซๅบฆใชใใฉใผใ 
 - ใชในใ
ย ย - ในใฟใณใใผใใใผใใซ
ย ย - ในใฟใณใใผใใชในใ
ย ย - ใซใผใใชในใ
ย ย - ๆค็ดขใชในใ๏ผใใญใธใงใฏใ/ใขใใชใฑใผใทใงใณ/่จไบ๏ผ
 - ใใญใใฃใผใซ
ย ย - ็ฐกๅใชใใญใใฃใผใซ
ย ย - ้ซๅบฆใชใใญใใกใคใซ
 - ใขใซใฆใณใ
ย ย - ใขใซใฆใณใใปใณใฟใผ
ย ย - ใขใซใฆใณใ่จญๅฎ
 - ็ตๆ
ย ย - ๆๅ
ย ย - ๅคฑๆ
 - ไพๅค
ย ย - 403
ย ย - 404
ย ย - 500
 - ใฆใผใถใผ
ย ย - ใญใฐใคใณ
ย ย - ็ป้ฒ
ย ย - ็ป้ฒ็ตๆ
```

## ไฝฟ็จๆณ

### bash ใไฝฟใๆนๆณ

```bash
$ mkdir <your-project-name>
$ cd <your-project-name>
$ yarn create umi  # or npm create umi

# Choose login:
 Select the boilerplate type (Use arrow keys)
โฏ login  - Create project with an layout-only login boilerplate, use together with umi block.
  app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.

$ git init
$ npm install
$ npm start         # http://localhost:8000 ใ้ใ
```

### Gitpod ใไฝฟใๆนๆณ

Gitpod๏ผGitHub ็จใฎ็กๆใชใณใฉใคใณ้็บ็ฐๅข๏ผใงใใญใธใงใฏใใ้ใใใใใซใณใผใใฃใณใฐใ้ๅงใงใใพใใ

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design-pro)

ใใฎไปใฎๆ็คบใฏ [ใใญใฅใกใณใ](http://pro.ant.design/docs/getting-started) ใ็ขบ่ชใใฆใใ ใใใ

## ใตใใผใใใใใฉใฆใถใผ

ใขใใณใชใใฉใฆใถใจ IE11ใ

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | ๆๆฐ็ใใ 2 ใใผใธใงใณ | ๆๆฐ็ใใ 2 ใใผใธใงใณ | ๆๆฐ็ใใ 2 ใใผใธใงใณ | ๆๆฐ็ใใ 2 ใใผใธใงใณ |

## ่ฒข็ฎใใ

ใฉใใช็จฎ้กใฎ่ฒข็ฎใงใๅคงๆญ่ฟใงใใใใชใใใใฎใใญใธใงใฏใใซ่ฒข็ฎใงใใๆนๆณใฎใใใคใใฎไพใฏใใใซใใใพใใ๏ผ

- ๆฏๆฅใฎไปไบใซ Ant Design Pro ใไฝฟ็จใใใใจใ
- ๅ ฑๅใใใใจใ [issues](http://github.com/ant-design/ant-design-pro/issues) ใซใใฐๅ ฑๅใ่ณชๅใใใฆใใ ใใใ
- ๆดๆฐใใใใจใ ๆนๅใใ[pull requests](http://github.com/ant-design/ant-design-pro/pulls) ใง้ใฃใฆใใ ใใใ

[![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev)
