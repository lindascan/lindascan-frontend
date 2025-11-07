import {
    FaqAsync,
    AboutAsync,
    LedgerHelpAsync
} from "../components/async";

export const HelpRoutes = [

    {
        path: "/help",
        label: "help",
        icon: "fa fa-question",
        component: null,
        showInMenu: false,
        routes: [
            "LINDA",
            {
                url: "https://dn-peiwo-web.qbox.me/What_is_LINDA1.4.pdf",
                label: "what_is_linda"
            },
            "-",
            "Lindascan",
            {
                label: "frequently_asked_questions",
                component: FaqAsync,
                path: "/help/faq"
            },
            // {
            //   label: "copyright",
            //   component: CopyrightAsync,
            //   path: "/help/copyright",
            //   showInMenu: false
            // },
            {
                label: "about",
                component: AboutAsync,
                path: "/help/about",
                showInMenu: false
            },
            {
                label: "ledger_guide",
                component: LedgerHelpAsync,
                path: "/help/ledger"
            },
            {
                url: "https://t.me/tronscan",
                label: "telegram_updates"
            },
            "-",
            "Community",
            {
                url: "https://www.reddit.com/r/tronix",
                label: "reddit"
            },
            {
                url: "https://t.me/tronscantalk",
                label: "telegram"
            },
            "-",
            "Development",
            {
                url: "https://github.com/lindascan/lindascan-frontend/blob/dev2019/document/api.md",
                label: "linda_explorer_api"
            },
            {
                url: "https://dn-peiwo-web.qbox.me/Design_Book_of_LINDA_Architecture1.4.pdf",
                label: "linda_architechure"
            },
            {
                url: "https://dn-peiwo-web.qbox.me/LINDA%20Protobuf%20Protocol%20Document.pdf",
                label: "linda_protobuf_doc"
            },
            "-",
            "Feedback",
            {
                url: "https://github.com/lindascan/lindascan-frontend/issues/new",
                label: "report_an_error"
            }
        ]
    },
]