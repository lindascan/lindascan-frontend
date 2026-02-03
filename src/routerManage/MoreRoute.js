import {
    SystemAsync,
    TransactionViewerAsync,
    LindaConvertToolAsync,
    FaqAsync,
    LedgerHelpAsync
} from "../components/async";


export const MoreRoutes = [

    {
        path: "/more",
        label: "nav_more",
        icon: "fas fa-indent",
        routes: [
            [
                "Documentation",
                {
                    url: "https://lindacoin.org/static/doc/white_paper_v_2_0.pdf",
                    // icon: "fa fa-globe",
                    label: "what_is_linda"
                },
                {
                    url: "https://dn-peiwo-web.qbox.me/Design_Book_of_LINDA_Architecture1.4.pdf",
                    // icon: "fa fa-outdent",
                    label: "linda_architechure"
                },
                {
                    url: "https://github.com/lindascan/lindascan-frontend/blob/dev2019/document/api.md",
                    // icon: "fa fa-building",
                    label: "linda_explorer_api"
                },
                {
                    url: "https://dn-peiwo-web.qbox.me/LINDA%20Protobuf%20Protocol%20Document.pdf",
                    // icon: "fa fa-book",
                    label: "linda_protobuf_doc"
                },

                {
                    label: "frequently_asked_questions",
                    // icon: "fa fa-question",
                    component: FaqAsync,
                    path: "/help/faq"
                },

                // {
                //     label: "copyright",
                //     component: CopyrightAsync,
                //     path: "/help/copyright",
                //     showInMenu: false
                // },
                // {
                //     label: "about",
                //     component: AboutAsync,
                //     path: "/help/about",
                //     showInMenu: false
                // },
                // {
                //     label: "ledger_guide",
                //     component: LedgerHelpAsync,
                //     path: "/help/ledger"
                // },
                // {
                //     url: "https://t.me/lindascan",
                //     label: "telegram_updates"
                // },
                // {   url: "https://www.reddit.com/r/lindaix",
                //     label: "reddit"
                // },
                // {   url: "https://t.me/lindascantalk",
                //     label: "telegram"
                // },
                // {
                //     url: "https://github.com/lindascan/lindascan-frontend/issues/new",
                //     label: "report_an_error"
                // }
            ],
            [
                "tools",
                {
                    path: "/tools/system",
                    // icon: "fa fa-database",
                    label: "system",
                    component: SystemAsync
                },
                {
                    label: "transaction_viewer",
                    path: "/tools/transaction-viewer",
                    // icon: "fa fa-eye",
                    component: TransactionViewerAsync
                },
                {
                    label: "linda_convert_tool",
                    path: "/tools/linda-convert-tool",
                    // icon: "fa fa-random",
                    component: LindaConvertToolAsync
                },
                {
                    url: "https://shasta.lindascan.org",
                    // icon: "fa fa-link",
                    label: "link_test_server",
                    sidechain: false
                },
                // {
                //   label: "node_tester",
                //   path: "/tools/node-tester",
                //   icon: "fa fa-server",
                //   component: NodeTesterAsync
                // }
                // {
                //     url: "https://github.com/lindascan/lindascan-desktop/releases",
                //     icon: "fa fa-download",
                //     label: "desktop_explorer"
                // },
            ],

            [
                "Other",

                {
                    url: "https://www.lindagrid.lindacoin.org/shasta",
                    // icon: "fa fa-recycle",
                    label: "link_test_fauct",
                    sidechain: false
                },
                // {
                //   url: "https://dapphouse.org",
                //   icon: "fa fa-archive",
                //   label: "DApps"
                // },
                {
                    path: "/markets",
                    label: "markets",
                    // icon: "fa fa-chart-line", // component: MarketsAsync
                    enurl: "https://coinmarketcap.com/currencies/tron/",
                    zhurl: "https://coinmarketcap.com/zh/currencies/tron/",
                    linkHref: true
                },
                {
                    path: "/more/list_lind",
                    label: "list_lind",
                    // icon: "fa fa-plus",
                    enurl: "https://lindacoin.org/exchangesList?lng=en",
                    zhurl: "https://lindacoin.org/exchangesList?lng=zh",
                    linkHref: true
                },
                {
                    label: "ledger_guide",
                    // icon: "fa fa-tags",
                    component: LedgerHelpAsync,
                    path: "/help/ledger"
                }
                // {
                //   icon: "fas fa-columns",
                //   label: "Main_Chain",
                //   sidechain:true,
                // },
            ]
        ]
    },
    // {
    //   path: "/more",
    //   label: "nav_more",
    //   icon: "fas fa-indent",
    //   routes: [
    //     {
    //       path: "/markets",
    //       label: "markets",
    //       icon: "fa fa-chart-line", // component: MarketsAsync
    //       enurl: "https://coinmarketcap.com/currencies/tron/",
    //       zhurl: "https://coinmarketcap.com/zh/currencies/tron/",
    //       linkHref: true
    //     },
    //     {
    //       path: "/more/list_lind",
    //       label: "list_lind",
    //       icon: "fa fa-plus",
    //       enurl: "https://lindacoin.org/exchangesList?lng=en",
    //       zhurl: "https://lindacoin.org/exchangesList?lng=zh",
    //       linkHref: true
    //     }
    //   ]
    // },

    // {
    //     path: "/more",
    //     label: "NewMore",
    //     icon: "fas fa-indent",
    //     routes: [
    //         {
    //             path: "/markets",
    //             label: "markets",
    //             icon: "fa fa-chart-line", // component: MarketsAsync
    //             enurl: "https://coinmarketcap.com/currencies/tron/",
    //             zhurl: "https://coinmarketcap.com/zh/currencies/tron/",
    //             linkHref: true
    //         },
    //         {
    //             path: "/more/list_lind",
    //             label: "list_lind",
    //             icon: "fa fa-plus",
    //             enurl: "https://lindacoin.org/exchangesList?lng=en",
    //             zhurl: "https://lindacoin.org/exchangesList?lng=zh",
    //             linkHref: true
    //         }
    //     ]
    // },
]