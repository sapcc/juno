// export const THEME_PARAM_KEY = "junoThemeMode"
export const STORAGE_KEY = "__junoThemeMode"

export const JUNO_THEME_CHANGE = "JUNO_THEME_CHANGE"

export const ICON_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEuNzEwNzIgMEMwLjc2NTkxNiAwIDAgMC43NjU5MTQgMCAxLjcxMDcyVjQ4LjI4OTNDMCA0OS4yMzQxIDAuNzY1OTE0IDUwIDEuNzEwNzIgNTBIOC42MDE2M0M2Ljg4NjIgNDcuODYgNS44NjAxMSA0NS4xNDM2IDUuODYwMTEgNDIuMTg3NkM1Ljg2MDExIDM1LjgxMTkgMTAuNjMzNSAzMC41NTEgMTYuODAxNSAyOS43ODM4QzE3LjU3NzUgMjMuMTMxNSAyMy4yMzIzIDE3Ljk2ODkgMzAuMDkyOSAxNy45Njg5QzM0LjgzNDQgMTcuOTY4OSAzOSAyMC40MzQ4IDQxLjM3NzEgMjQuMTU0MUM0Mi4zMTM1IDIzLjk1OTYgNDMuMjgzNyAyMy44NTczIDQ0LjI3NzggMjMuODU3M0M0Ni4zMTM5IDIzLjg1NzMgNDguMjQ5OCAyNC4yODYzIDUwIDI1LjA1ODhWMS43MTA3MkM1MCAwLjc2NTkxNiA0OS4yMzQxIDAgNDguMjg5MyAwSDEuNzEwNzJaTTUwIDI4LjkyNDFDNDguMzQyNCAyNy44ODE3IDQ2LjM4MDUgMjcuMjc4OCA0NC4yNzc4IDI3LjI3ODhDNDMuNTE4OSAyNy4yNzg4IDQyLjc4MiAyNy4zNTY4IDQyLjA3MzIgMjcuNTA0TDM5Ljc2NDIgMjcuOTgzOEwzOC40OTQyIDI1Ljk5NjdDMzYuNzE5MiAyMy4yMTk0IDMzLjYxODUgMjEuMzkwMyAzMC4wOTI5IDIxLjM5MDNDMjQuOTg4OCAyMS4zOTAzIDIwLjc3NzEgMjUuMjMyMyAyMC4xOTk5IDMwLjE4MDNMMTkuODg4NyAzMi44NDc2TDE3LjIyMzggMzMuMTc5MUMxMi43NDc2IDMzLjczNTkgOS4yODE1NSAzNy41NTk2IDkuMjgxNTUgNDIuMTg3NkM5LjI4MTU1IDQ1LjUwOSAxMS4wNjcxIDQ4LjQxNzQgMTMuNzMxMSA1MEg0OC4yODkzQzQ5LjIzNDEgNTAgNTAgNDkuMjM0MSA1MCA0OC4yODkzVjI4LjkyNDFaIiBmaWxsPSIjRjBBQjAwIj48L3BhdGg+PC9zdmc+"
export const LOGO_DARK_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNDUiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMDAgNDUiPgogIDxwYXRoIGZpbGw9IiNGMEFCMDAiIGQ9Ik0xLjQgMEExLjQgMS40IDAgMCAwIDAgMS40djQyLjAwM2ExLjQgMS40IDAgMCAwIDEuNCAxLjRoNi4zMDdhMTEuMTUzIDExLjE1MyAwIDAgMS0yLjQ1Ny03YzAtNS43MTMgNC4yNzctMTAuNDI3IDkuODA1LTExLjExNS42OTUtNS45NiA1Ljc2Mi0xMC41ODcgMTEuOTEtMTAuNTg3IDQuMjQ4IDAgNy45OCAyLjIxIDEwLjExMSA1LjU0Mi44NC0uMTc0IDEuNzA5LS4yNjYgMi42LS4yNjYgMS44MjQgMCAzLjU2LjM4NSA1LjEyOCAxLjA3N1YxLjRhMS40IDEuNCAwIDAgMC0xLjQtMS40SDEuNFoiLz4KICA8cGF0aCBmaWxsPSIjRjBBQjAwIiBkPSJNNDQuODA0IDI1LjYwNmE5Ljk2MyA5Ljk2MyAwIDAgMC03LjE1OC0xLjIybC0xLjg5LjM5Mi0xLjA0LTEuNjI3YTkuMTkzIDkuMTkzIDAgMCAwLTE2Ljg4IDMuODYxbC0uMjU1IDIuMTg0LTIuMTguMjdhOC40MDMgOC40MDMgMCAwIDAtMy41OTYgMTUuMzM3aDMxLjU5OGExLjQgMS40IDAgMCAwIDEuNC0xLjRWMjUuNjA2WiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xNzQuMDMzIDM3di00LjUxOGgzLjM2VjE1LjQ1NmgtMy4zNnYtNC41MThoMTIuMzk2djQuNTE4aC0zLjM2MXYxNy4wMjZoMy4zNjFWMzdoLTEyLjM5NlptLTE5LjU0MS0yNi4wNjJ2MTUuOThjMCAxLjg0My4zNjEgMy4yMjQgMS4wODMgNC4xNDUuNzIyLjg5NiAxLjkyOSAxLjM0NCAzLjYyMiAxLjM0NCAxLjY5MyAwIDIuOS0uNDQ4IDMuNjIyLTEuMzQ0LjcyMi0uOTIgMS4wODMtMi4zMDIgMS4wODMtNC4xNDR2LTE1Ljk4aDUuNTI2VjI2LjMyYzAgMS45MTctLjE4NyAzLjU4NS0uNTYxIDUuMDA0LS4zNDggMS4zOTQtLjkzMyAyLjU1MS0xLjc1NCAzLjQ3Mi0uODIyLjg5Ni0xLjg4IDEuNTY4LTMuMTc0IDIuMDE2LTEuMjk1LjQyMy0yLjg3NS42MzUtNC43NDIuNjM1cy0zLjQ0OC0uMjEyLTQuNzQyLS42MzVjLTEuMjk0LS40NDgtMi4zNTItMS4xMi0zLjE3NC0yLjAxNi0uODIxLS45Mi0xLjQxOS0yLjA3OC0xLjc5Mi0zLjQ3Mi0uMzQ4LTEuNDItLjUyMy0zLjA4Ny0uNTIzLTUuMDA0VjEwLjkzOGg1LjUyNlptLTI3LjYyMSAyNi41MWMtMS40NDQgMC0yLjczOS0uMjM2LTMuODg0LS43MWE3LjkyIDcuOTIgMCAwIDEtMi44NzUtMi4wNTNjLS43NzEtLjg5Ni0xLjM2OS0xLjk3OS0xLjc5Mi0zLjI0OC0uNDIzLTEuMjctLjYzNS0yLjY4OS0uNjM1LTQuMjU3IDAtMS41NjguMjEyLTIuOTg3LjYzNS00LjI1Ni40MjMtMS4yNyAxLjAyMS0yLjM0IDEuNzkyLTMuMjExYTcuOTIgNy45MiAwIDAgMSAyLjg3NS0yLjA1NGMxLjE0NS0uNDczIDIuNDQtLjcxIDMuODg0LS43MSAxLjQ0MyAwIDIuNzI1LjIzNyAzLjg0NS43MWE3LjUxNCA3LjUxNCAwIDAgMSAyLjg3NSAyLjA1NGMuNzk3Ljg3IDEuNDA3IDEuOTQxIDEuODMgMy4yMS40MjMgMS4yNy42MzUgMi42ODkuNjM1IDQuMjU3IDAgMS41NjgtLjIxMiAyLjk4Ny0uNjM1IDQuMjU3LS40MjMgMS4yNy0xLjAzMyAyLjM1Mi0xLjgzIDMuMjQ4LS43NzEuODk2LTEuNzMgMS41OC0yLjg3NSAyLjA1NC0xLjEyLjQ3My0yLjQwMi43MS0zLjg0NS43MVptMC00LjM2OGMxLjA5NSAwIDEuOTQxLS4zMzcgMi41MzgtMS4wMDkuNTk4LS42NzIuODk3LTEuNjMuODk3LTIuODc1di0zLjk5NWMwLTEuMjQ0LS4yOTktMi4yMDMtLjg5Ny0yLjg3NS0uNTk3LS42NzItMS40NDMtMS4wMDgtMi41MzgtMS4wMDgtMS4wOTYgMC0xLjk0Mi4zMzYtMi41MzkgMS4wMDgtLjU5OC42NzItLjg5NyAxLjYzLS44OTcgMi44NzV2My45OTVjMCAxLjI0NS4yOTkgMi4yMDMuODk3IDIuODc1LjU5Ny42NzIgMS40NDMgMS4wMDkgMi41MzkgMS4wMDlaTTk2LjY3NSAzN1YxNy4zOThoNS41MjZ2My4zMjNoLjIyNGMuMzQ5LTEuMDIuOTU5LTEuOTA0IDEuODMtMi42NTEuODcxLS43NDcgMi4wNzgtMS4xMiAzLjYyMi0xLjEyIDIuMDE2IDAgMy41MzQuNjcyIDQuNTU1IDIuMDE2IDEuMDQ1IDEuMzQ0IDEuNTY4IDMuMjYgMS41NjggNS43NVYzN2gtNS41MjZWMjUuMTY0YzAtMS4yNy0uMTk5LTIuMjAzLS41OTctMi44LS4zOTktLjYyMy0xLjEwOC0uOTM0LTIuMTI5LS45MzRhNC42IDQuNiAwIDAgMC0xLjMwNi4xODcgMy4yNiAzLjI2IDAgMCAwLTEuMTU4LjUyM2MtLjMyNC4yNDgtLjU4NS41Ni0uNzg0LjkzMy0uMTk5LjM0OS0uMjk5Ljc2LS4yOTkgMS4yMzJWMzdoLTUuNTI2Wm0tMTAuNjY3LTMuMjg2aC0uMTg3Yy0uMTc0LjQ5OC0uNDEuOTcxLS43MSAxLjQyYTQuNDU2IDQuNDU2IDAgMCAxLTEuMDgyIDEuMTk0IDUuMTQgNS4xNCAwIDAgMS0xLjYwNi44MjFjLS41OTcuMi0xLjI5NC4zLTIuMDkuMy0yLjAxNyAwLTMuNTQ4LS42Ni00LjU5My0xLjk4LTEuMDItMS4zNDQtMS41MzEtMy4yNi0xLjUzMS01Ljc1VjE3LjM5OGg1LjUyNnYxMS44MzZjMCAxLjE5NC4yMTIgMi4xMTUuNjM1IDIuNzYzLjQyMy42NDcgMS4xNDUuOTcgMi4xNjUuOTcuNDI0IDAgLjg0Ny0uMDYyIDEuMjctLjE4NmEzLjg2OSAzLjg2OSAwIDAgMCAxLjEyLS41MjNjLjMyNC0uMjQ5LjU4NS0uNTQ4Ljc4NC0uODk2LjItLjM0OC4yOTktLjc2LjI5OS0xLjIzMlYxNy4zOThoNS41MjZWMzdoLTUuNTI2di0zLjI4NlpNNjkuMTQ2IDEwLjkzOHYxOC41MmMwIDEuMTk1LS4xOTkgMi4yOS0uNTk3IDMuMjg1YTYuNjMgNi42MyAwIDAgMS0xLjY4IDIuNTAyYy0uNzQ3LjY3Mi0xLjY1NiAxLjIwNy0yLjcyNiAxLjYwNi0xLjA0Ni4zNzMtMi4yNC41Ni0zLjU4NC41Ni0xLjI5NSAwLTIuNDQtLjE3NS0zLjQzNi0uNTIzYTcuNjA5IDcuNjA5IDAgMCAxLTIuNTM5LTEuNDkzIDguMDE4IDguMDE4IDAgMCAxLTEuNzE3LTIuMzE2IDEwLjIzMiAxMC4yMzIgMCAwIDEtLjkzNC0yLjk4Nmw1LjMwMi0xLjA0NmMuNDI0IDIuMjY1IDEuNTA2IDMuMzk4IDMuMjQ5IDMuMzk4LjgyMSAwIDEuNTE4LS4yNjIgMi4wOS0uNzg0LjU5OC0uNTIzLjg5Ny0xLjM0NS44OTctMi40NjVWMTUuNDkzaC03LjkxNnYtNC41NTVoMTMuNTkxWiIvPgo8L3N2Zz4K"

export const LOGO_LIGHT_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNDUiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMDAgNDUiPgogIDxwYXRoIGZpbGw9IiNGMEFCMDAiIGQ9Ik0xLjQgMEExLjQgMS40IDAgMCAwIDAgMS40djQyLjAwM2ExLjQgMS40IDAgMCAwIDEuNCAxLjRoNi4zMDdhMTEuMTUzIDExLjE1MyAwIDAgMS0yLjQ1Ny03YzAtNS43MTMgNC4yNzctMTAuNDI3IDkuODA1LTExLjExNS42OTUtNS45NiA1Ljc2Mi0xMC41ODcgMTEuOTEtMTAuNTg3IDQuMjQ4IDAgNy45OCAyLjIxIDEwLjExMSA1LjU0Mi44NC0uMTc0IDEuNzA5LS4yNjYgMi42LS4yNjYgMS44MjQgMCAzLjU2LjM4NSA1LjEyOCAxLjA3N1YxLjRhMS40IDEuNCAwIDAgMC0xLjQtMS40SDEuNFoiLz4KICA8cGF0aCBmaWxsPSIjRjBBQjAwIiBkPSJNNDQuODA0IDI1LjYwNmE5Ljk2MyA5Ljk2MyAwIDAgMC03LjE1OC0xLjIybC0xLjg5LjM5Mi0xLjA0LTEuNjI3YTkuMTkzIDkuMTkzIDAgMCAwLTE2Ljg4IDMuODYxbC0uMjU1IDIuMTg0LTIuMTguMjdhOC40MDMgOC40MDMgMCAwIDAtMy41OTYgMTUuMzM3aDMxLjU5OGExLjQgMS40IDAgMCAwIDEuNC0xLjRWMjUuNjA2WiIvPgogIDxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0xNzQuMDMzIDM3di00LjUxOGgzLjM2VjE1LjQ1NmgtMy4zNnYtNC41MThoMTIuMzk2djQuNTE4aC0zLjM2MXYxNy4wMjZoMy4zNjFWMzdoLTEyLjM5NlptLTE5LjU0MS0yNi4wNjJ2MTUuOThjMCAxLjg0My4zNjEgMy4yMjQgMS4wODMgNC4xNDUuNzIyLjg5NiAxLjkyOSAxLjM0NCAzLjYyMiAxLjM0NCAxLjY5MyAwIDIuOS0uNDQ4IDMuNjIyLTEuMzQ0LjcyMi0uOTIgMS4wODMtMi4zMDIgMS4wODMtNC4xNDR2LTE1Ljk4aDUuNTI2VjI2LjMyYzAgMS45MTctLjE4NyAzLjU4NS0uNTYxIDUuMDA0LS4zNDggMS4zOTQtLjkzMyAyLjU1MS0xLjc1NCAzLjQ3Mi0uODIyLjg5Ni0xLjg4IDEuNTY4LTMuMTc0IDIuMDE2LTEuMjk1LjQyMy0yLjg3NS42MzUtNC43NDIuNjM1cy0zLjQ0OC0uMjEyLTQuNzQyLS42MzVjLTEuMjk0LS40NDgtMi4zNTItMS4xMi0zLjE3NC0yLjAxNi0uODIxLS45Mi0xLjQxOS0yLjA3OC0xLjc5Mi0zLjQ3Mi0uMzQ4LTEuNDItLjUyMy0zLjA4Ny0uNTIzLTUuMDA0VjEwLjkzOGg1LjUyNlptLTI3LjYyMSAyNi41MWMtMS40NDQgMC0yLjczOS0uMjM2LTMuODg0LS43MWE3LjkyIDcuOTIgMCAwIDEtMi44NzUtMi4wNTNjLS43NzEtLjg5Ni0xLjM2OS0xLjk3OS0xLjc5Mi0zLjI0OC0uNDIzLTEuMjctLjYzNS0yLjY4OS0uNjM1LTQuMjU3IDAtMS41NjguMjEyLTIuOTg3LjYzNS00LjI1Ni40MjMtMS4yNyAxLjAyMS0yLjM0IDEuNzkyLTMuMjExYTcuOTIgNy45MiAwIDAgMSAyLjg3NS0yLjA1NGMxLjE0NS0uNDczIDIuNDQtLjcxIDMuODg0LS43MSAxLjQ0MyAwIDIuNzI1LjIzNyAzLjg0NS43MWE3LjUxNCA3LjUxNCAwIDAgMSAyLjg3NSAyLjA1NGMuNzk3Ljg3IDEuNDA3IDEuOTQxIDEuODMgMy4yMS40MjMgMS4yNy42MzUgMi42ODkuNjM1IDQuMjU3IDAgMS41NjgtLjIxMiAyLjk4Ny0uNjM1IDQuMjU3LS40MjMgMS4yNy0xLjAzMyAyLjM1Mi0xLjgzIDMuMjQ4LS43NzEuODk2LTEuNzMgMS41OC0yLjg3NSAyLjA1NC0xLjEyLjQ3My0yLjQwMi43MS0zLjg0NS43MVptMC00LjM2OGMxLjA5NSAwIDEuOTQxLS4zMzcgMi41MzgtMS4wMDkuNTk4LS42NzIuODk3LTEuNjMuODk3LTIuODc1di0zLjk5NWMwLTEuMjQ0LS4yOTktMi4yMDMtLjg5Ny0yLjg3NS0uNTk3LS42NzItMS40NDMtMS4wMDgtMi41MzgtMS4wMDgtMS4wOTYgMC0xLjk0Mi4zMzYtMi41MzkgMS4wMDgtLjU5OC42NzItLjg5NyAxLjYzLS44OTcgMi44NzV2My45OTVjMCAxLjI0NS4yOTkgMi4yMDMuODk3IDIuODc1LjU5Ny42NzIgMS40NDMgMS4wMDkgMi41MzkgMS4wMDlaTTk2LjY3NSAzN1YxNy4zOThoNS41MjZ2My4zMjNoLjIyNGMuMzQ5LTEuMDIuOTU5LTEuOTA0IDEuODMtMi42NTEuODcxLS43NDcgMi4wNzgtMS4xMiAzLjYyMi0xLjEyIDIuMDE2IDAgMy41MzQuNjcyIDQuNTU1IDIuMDE2IDEuMDQ1IDEuMzQ0IDEuNTY4IDMuMjYgMS41NjggNS43NVYzN2gtNS41MjZWMjUuMTY0YzAtMS4yNy0uMTk5LTIuMjAzLS41OTctMi44LS4zOTktLjYyMy0xLjEwOC0uOTM0LTIuMTI5LS45MzRhNC42IDQuNiAwIDAgMC0xLjMwNi4xODcgMy4yNiAzLjI2IDAgMCAwLTEuMTU4LjUyM2MtLjMyNC4yNDgtLjU4NS41Ni0uNzg0LjkzMy0uMTk5LjM0OS0uMjk5Ljc2LS4yOTkgMS4yMzJWMzdoLTUuNTI2Wm0tMTAuNjY3LTMuMjg2aC0uMTg3Yy0uMTc0LjQ5OC0uNDEuOTcxLS43MSAxLjQyYTQuNDU2IDQuNDU2IDAgMCAxLTEuMDgyIDEuMTk0IDUuMTQgNS4xNCAwIDAgMS0xLjYwNi44MjFjLS41OTcuMi0xLjI5NC4zLTIuMDkuMy0yLjAxNyAwLTMuNTQ4LS42Ni00LjU5My0xLjk4LTEuMDItMS4zNDQtMS41MzEtMy4yNi0xLjUzMS01Ljc1VjE3LjM5OGg1LjUyNnYxMS44MzZjMCAxLjE5NC4yMTIgMi4xMTUuNjM1IDIuNzYzLjQyMy42NDcgMS4xNDUuOTcgMi4xNjUuOTcuNDI0IDAgLjg0Ny0uMDYyIDEuMjctLjE4NmEzLjg2OSAzLjg2OSAwIDAgMCAxLjEyLS41MjNjLjMyNC0uMjQ5LjU4NS0uNTQ4Ljc4NC0uODk2LjItLjM0OC4yOTktLjc2LjI5OS0xLjIzMlYxNy4zOThoNS41MjZWMzdoLTUuNTI2di0zLjI4NlpNNjkuMTQ2IDEwLjkzOHYxOC41MmMwIDEuMTk1LS4xOTkgMi4yOS0uNTk3IDMuMjg1YTYuNjMgNi42MyAwIDAgMS0xLjY4IDIuNTAyYy0uNzQ3LjY3Mi0xLjY1NiAxLjIwNy0yLjcyNiAxLjYwNi0xLjA0Ni4zNzMtMi4yNC41Ni0zLjU4NC41Ni0xLjI5NSAwLTIuNDQtLjE3NS0zLjQzNi0uNTIzYTcuNjA5IDcuNjA5IDAgMCAxLTIuNTM5LTEuNDkzIDguMDE4IDguMDE4IDAgMCAxLTEuNzE3LTIuMzE2IDEwLjIzMiAxMC4yMzIgMCAwIDEtLjkzNC0yLjk4Nmw1LjMwMi0xLjA0NmMuNDI0IDIuMjY1IDEuNTA2IDMuMzk4IDMuMjQ5IDMuMzk4LjgyMSAwIDEuNTE4LS4yNjIgMi4wOS0uNzg0LjU5OC0uNTIzLjg5Ny0xLjM0NS44OTctMi40NjVWMTUuNDkzaC03LjkxNnYtNC41NTVoMTMuNTkxWiIvPgo8L3N2Zz4K"