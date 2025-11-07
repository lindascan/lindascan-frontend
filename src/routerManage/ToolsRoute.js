import {
    TransactionViewerAsync,
    LindaConvertToolAsync,
    SystemAsync,
} from "../components/async";


export const ToolsRoutes = [

    {
        path: "/tools",
        label: "tools",
        icon: "fa fa-wrench",
        component: null,
        showInMenu: false,
        routes: [
            // {
            //   label: "verify_contract_code",
            //   path: "/tools/verify-contract-code",
            //   icon: "fa fa-check-square",
            //   component: VerifyContractCodeAsync,
            // },
            {
                label: "transaction_viewer",
                path: "/tools/transaction-viewer",
                icon: "fa fa-eye",
                component: TransactionViewerAsync
            },
            // {
            //   label: "node_tester",
            //   path: "/tools/node-tester",
            //   icon: "fa fa-server",
            //   component: NodeTesterAsync
            // },
            {
                label: "linda_convert_tool",
                path: "/tools/linda-convert-tool",
                icon: "fa fa-random",
                component: LindaConvertToolAsync
            },
            {
                path: "/tools/system",
                icon: "fa fa-database",
                label: "system",
                component: SystemAsync
            },
            {
                url: "https://github.com/lindascan/lindascan-desktop/releases",
                icon: "fa fa-download",
                label: "desktop_explorer"
            },
            {
                url: "https://explorer.shasta.trongrid.io",
                icon: "fa fa-link",
                label: "link_test_server"
            },
            {
                url: "https://www.trongrid.io/shasta",
                icon: "fa fa-recycle",
                label: "link_test_fauct"
            }
        ]
    },

]