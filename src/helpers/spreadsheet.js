import config from "../config";

export function load(callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
        .get({
            spreadsheetId: config.SHEET_ID,
            range: "A1:Z99"
        })
        .then(
            response => {
            const data = response.result.values;
            
            const dicas = data.map(item => ({                
                categoria: item[0],
                subcategoria: item[1],
                titulo: item[2],
                link: item[3],
                descricao: item[4]
            })) || [];
            
            const categorias = Array.from(new Set(dicas.map(dica => dica.categoria))).map(
                categoria => {
                    return {
                        titulo: categoria,
                        total: dicas.filter(item => item.categoria === categoria).length
                    }
                }
            )

            const totalRegistros = data.length;
        
            callback({
                dicas,
                categorias,
                totalRegistros
            })

            });
        },
        response => {
            callback(false, response.result.error);
        }
    );
    // const dicas = [
    // {
    //     categoria: "categoria1",
    //     subcategoria: "subcategoria",
    //     titulo: "titulo",
    //     link: "link",
    //     descricao: "descricao"
    // },
    // {
    //     categoria: "categoria1",
    //     subcategoria: "subcategoria",
    //     titulo: "titulo",
    //     link: "link",
    //     descricao: "descricao"
    // },
    // {
    //     categoria: "categoria1",
    //     subcategoria: "subcategoria",
    //     titulo: "titulo",
    //     link: "link",
    //     descricao: "descricao"
    // },
    // {
    //     categoria: "categoria2",
    //     subcategoria: "subcategoria",
    //     titulo: "titulo",
    //     link: "link",
    //     descricao: "descricao"
    // }];
    // const categorias = Array.from(new Set(dicas.map(dica => dica.categoria))).map(
    //     categoria => {
    //         return {
    //             titulo: categoria,
    //             total: dicas.filter(item => item.categoria === categoria).length
    //         }
    //     }
    // )

    // callback({
    //     dicas,
    //     categorias
    // })
}