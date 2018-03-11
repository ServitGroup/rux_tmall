console.log("content-script!");
const getCoffee = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("☕"), 1000); // it takes 2 seconds to make coffee
    });
};
const initdata = async() => {
    if (window.location.href.indexOf("tmall.com") > -1) {
        console.log("tmail website");
        let html = document.body.innerHTML;
        let skulist = await html.match(/skuList.*]/);
        if (skulist) {
            console.log('============================== SKULIST =========================================', skulist);
            skulist = skulist[0].replace('skuList":', "");
            skulist = JSON.parse(skulist);

            let skumaps = await html.match(/skuMap":.*}}/);
            skumaps = await skumaps[0].replace('skuMap":', "");
            skumaps = await skumaps.replace("}}}", "}}");
            skumaps = await JSON.parse(skumaps);
            await skulist.map(s => {
                let map = skumaps[";" + s.pvs + ";"];
                s.price = map.price;
                s.stock = map.stock;
                s.priceCent = map.priceCent;
                s.saleprice = 0;
                s.id = "";
                s.url = "";
            });
            // let lista = await document.querySelectorAll(
            //     "#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-key > div > div > dl.tb-prop.tm-sale-prop.tm-clear.tm-img-prop > dd > ul *> a"
            // );
            // let lista = await document.querySelectorAll('.J_TSaleProp *> a ');
            let lista = await document.querySelectorAll('#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-key > div > div > dl:nth-child(1) > dd > ul *> a');
            console.log("sku---", skulist);
            window.skulist = skulist;
            console.log('skulist-->', window.skulist);
            for (let i = 0; i < lista.length; i++) {
                if (lista[i].href != undefined) {
                    skulist[i].url = lista[i].href;
                } else {
                    skulist[i].url = '';
                }
                lista[i].click();
                await getCoffee()
                await getCoffee()
                let sprices = await document.querySelectorAll(".tm-price")
                for (let j = 0; j < sprices.length; j++) {
                    console.log(i, '/', j, "===>", sprices[j].innerText);
                    skulist[i]['sprice' + j] = await sprices[j].innerText;
                    await getCoffee()
                }

                if (skulist[i]['sprice1'] == 0) {
                    skulist[i]['sprice1'] = await document.querySelector('#J_PromoPrice > dd > div > span').innerText;
                }

            }

            if (skulist) {
                console.log('+++++++++++++++++++++++++++++++SKULIST++++++++++++++++++++++++++++++++++++++++', skulist);
                let data = {};
                data.skulist = skulist;
                data.test = 2;
                data.baseurl = window.location.href.split("&")[0].split("?")[0];
                let urls = window.location.href.split("&");
                for (let u of urls) {
                    if (u.indexOf("id") == 0) {
                        data.baseid = u.split("=")[1];
                    }
                }
                if (data.baseid == undefined) {
                    data.baseid = urls[0].split("?")[1].split("=")[1];
                }

                console.log('data------>', data);
                let jsondata = await JSON.stringify(data);
                console.log("start-----fetch-------------------->", jsondata);
                await fetch("//www.asiathemall.com/tmallgetprice/tmallres.php", {
                        method: "post",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: jsondata
                    })
                    .then(r => {
                        alert(JSON.stringify(data))
                    })
                    .catch(error => {
                        console.log('error------featch', e);
                    });
            }
        } else {
            console.log('--------------no---skulist-------------------------------');
            let data = {};
            data.skulist = [];
            let skulist = {
                skuId: '-',
                names: await document.querySelector('#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-detail-hd > *').innerText,
                url: window.location.href,
                pvs: '-',
                price: '0',
                stock: '0',
                skuId: '-'
            };
            data.baseurl = await window.location.href.split("&")[0].split("?")[0];
            let urls = await window.location.href.split("&");
            for (let u of urls) {
                if (u.indexOf("id") == 0) {
                    data.baseid = u.split("=")[1];
                }
            }

            if (data.baseid == undefined) {
                data.baseid = await urls[0].split("?")[1].split("=")[1];
            }

            let sprices = [];
            // await setTimeout(function() {
            await getCoffee()
            sprices = await document.querySelectorAll('.tm-price')
            console.log('sprices-->', sprices);
            // }, 200);

            for (let j = 0; j < sprices.length; j++) {
                console.log(j, "===>", sprices[j].innerText);
                skulist['sprice' + j] = sprices[j].innerText;
            }

            await data.skulist.push(skulist);
            await console.log('data------>', data);
            let jsondata = await JSON.stringify(data);
            await console.log("start-----fetch-------------------->", jsondata);
            await fetch("//www.asiathemall.com/tmallgetprice/tmallres.php", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: jsondata
                })
                .then(r => {
                    alert(JSON.stringify(data))
                })
                .catch(error => {
                    console.log('error------featch', e);
                });

        }
    }
};

document.onreadystatechange = async function() {
    console.log("document.readyState---->", document.readyState);
    if (document.readyState == "complete") {
        await initdata();
        await console.log(
            "===================== SUCCESSED ============================="
        );
    }
};