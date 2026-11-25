exports.version = 1
exports.apiRequired = 8.1
exports.repo = "hugo529100/hfs-HighContrastDisable"
exports.description = "Disable forced color adjustment for Admin Panel and frontend"
exports.config = {
    frontendEnabled: {
        type: 'boolean',
        label: 'Disable forced color adjustment on frontend',
        defaultValue: true,
        helperText: 'Applies forced-color-adjust: none !important; to the user-facing frontend'
    }
}

exports.init = api => ({
    // 后台管理界面始终启用
    async middleware(ctx) {
        if (ctx.path.startsWith('/~/admin')) {
            return async () => {
                if (ctx.type === 'text/html' && ctx.body) {
                    const css = `<style>html,body{forced-color-adjust:none !important;}</style>`
                    ctx.body = String(ctx.body).replace('</head>', `${css}</head>`)
                }
            }
        }
    },

    // 前端页面根据开关动态插入 CSS
    customHtml: () => {
        if (!api.getConfig('frontendEnabled')) return {}
        return {
            afterHeader: `<style>
                html,body{forced-color-adjust:none !important;}
            </style>`
        }
    }
})