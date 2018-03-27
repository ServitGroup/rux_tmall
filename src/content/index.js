console.log("content-script!");
const getCoffee = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("☕"), 1000); // it takes 2 seconds to make coffee
    });
};
const sendajax = async skulist => {
    if (skulist) {
        console.log(
            "--------------------------start ajax---------------------------------------"
        );
        console.log(
            "+++++++++++++++++++++++++++++++SKULIST++++++++++++++++++++++++++++++++++++++++",
            skulist
        );
        let data = {};
        data.baseurl = window.location.href.split("&")[0].split("?")[0];
        let urls = window.location.href.split("&");
        for (let u of urls) {
            if (u.indexOf("id") == 0) {
                data.baseid = await u.split("=")[1];
            }
        }
        if (data.baseid == undefined) {
            data.baseid = await urls[0].split("?")[1].split("=")[1];
        }
        data.skulist = skulist;
        console.log("data--->", data);
        console.table(skulist);
        if (skulist.length > 0 && skulist[0].sprice1 >= "0") {
            let jsondata = await JSON.stringify(data);
            await fetch("//www.asiathemall.com/tmallgetprice/tmallres.php", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: jsondata
                })
                .then(r => {
                    // alert(JSON.stringify(data))
                    alert("successed");
                })
                .catch(error => {
                    console.log("error------featch", e);
                });
        }
    }
};

const initdata = async() => {
    if (window.location.href.indexOf("tmall.com") > -1) {
        console.log("tmail website");
        // let html = await document.body.innerHTML;
        // var skulist = await html.match(/skuList.*]/);
        // if (skulist) {
        //     console.log(
        //         "============================== SKULIST =========================================",
        //         skulist
        //     );

        //     skulist = await skulist[0].replace('skuList":', "");
        //     skulist = await JSON.parse(skulist);

        //     let skumaps = await html.match(/skuMap":.*}}/);
        //     skumaps = await skumaps[0].replace('skuMap":', "");
        //     skumaps = await skumaps.replace("}}}", "}}");
        //     skumaps = await JSON.parse(skumaps);
        //     await skulist.map(s => {
        //         let map = skumaps[";" + s.pvs + ";"];
        //         s.price = map.price;
        //         s.stock = map.stock;
        //         s.priceCent = map.priceCent;
        //         s.saleprice = 0;
        //         s.id = "";
        //         s.url = "";
        //     });
        // }

        // let $ar1 = await document.querySelectorAll(
        //     "#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-key > div > div > dl:nth-child(1) > dd > ul *> a"
        // );
        // let $ar2 = await document.querySelectorAll(
        //     "#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-key > div > div > dl:nth-child(2) > dd > ul *> a"
        // );
        // let $ar3 = await document.querySelectorAll(
        //     "#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-key > div > div > dl:nth-child(3) > dd > ul *> a"
        // );

        // const $ar1length = await $ar1.length;
        // const $ar2length = await $ar2.length;
        // const $ar3length = await $ar3.length;
        // let send = 0;
        // if (skulist) {
        console.log('---------------START---------------------------');
        let html = await document.body.innerHTML;
        var skulist = await html.match(/skuList.*]/);
        skulist = await skulist[0].replace('skuList":', "");
        skulist = await JSON.parse(skulist);
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

        let loc = await window.location.href;
        let urls = await loc.split('&');
        let idxx = -1;

        urls.map((u, idx) => {
            if (u.indexOf('skuId') == 0) {
                idxx = idx
            }
        })

        console.log('idxx--', idxx)

        for (let j = 0; j < skulist.length; j++) {

            let a = document.createElement('a')
            urls[idxx] = 'skuId=' + skulist[j].skuId
            a.href = urls.join('&')
            a.click();
            await getCoffee();
            await getCoffee();
            await getCoffee();
            let sprices = await document.querySelectorAll(".tm-price");
            for (let l = 0; l < sprices.length; l++) {
                console.log(l, "===>", sprices[l].innerText);
                skulist[i]["sprice" + l] = await sprices[l].innerText;
                await getCoffee();
            }

            if (skulist[i]["sprice1"] == 0) {
                skulist[i]["sprice1"] = await document.querySelector(
                    "#J_PromoPrice > dd > div > span"
                ).innerText;
            }
        }
        console.log('-------------------TEST TEST ------------------------------');
        console.table(skulist);


        // skulist.map(r => {
        //     let a = document.createElement('a')
        //     a.href = r
        //     g.appendChild(a)
        // })
        // document.body.appendChild(g)
        // let as = document.querySelectorAll('#tlen>a')

        // for (let i = 0; i < as.length; i++) {
        //     as[i].click();
        // }
        // console.log("skulist-->", $ar1length, $ar2length, $ar3length, skulist);
        // if (skulist && $ar1length > 0 && $ar2length > 0 && $ar3length > 0) {
        //     for (let i = 0; i < $ar1.length; i++) {
        //         await $ar1[i].click();
        //         await getCoffee();
        //         await getCoffee();
        //         await getCoffee();
        //         for (let j = 0; j < $ar2.length; j++) {
        //             await getCoffee();
        //             await getCoffee();
        //             await getCoffee();
        //             await $ar2[j].click();
        //             await getCoffee();
        //             await getCoffee();
        //             await getCoffee();
        //             for (let k = 0; k < $ar3.length; k++) {
        //                 await $ar3[k].click();
        //                 let filtertxt =
        //                     $ar1[i].innerText +
        //                     " " +
        //                     $ar2[j].innerText +
        //                     " " +
        //                     $ar3[k].innerText;
        //                 filtertxt = filtertxt.trim();
        //                 console.log("filtertxt-->", i, "/", j, "/", k, filtertxt);
        //                 let slist = skulist.find(s => s.names.indexOf(filtertxt) > -1);
        //                 console.log("slist-->", slist);
        //                 await getCoffee();
        //                 await getCoffee();
        //                 await getCoffee();
        //                 let sprices = await document.querySelectorAll(".tm-price");
        //                 let chk = 0;
        //                 for (let z = 0; z < sprices.length; z++) {
        //                     console.log(sprices[z].innerText);
        //                     if (sprices[z].innerText.indexOf("-") > -1) {
        //                         chk = 1;
        //                     }
        //                 }
        //                 if (chk) {
        //                     await $ar3[k].click();
        //                     await getCoffee();
        //                     await getCoffee();
        //                     await getCoffee();
        //                     sprices = await document.querySelectorAll(".tm-price");
        //                 }
        //                 let skufilters = window.location.href
        //                     .split("&")
        //                     .map(item => item.split("="))
        //                     .find(aa => aa[0] == "skuId");
        //                 console.log("skufilters==", skufilters);
        //                 let filtersku = "";
        //                 if (skufilters != undefined && skufilters.length > 0) {
        //                     filtersku = skufilters[1];
        //                     filtersku = filtersku.substr(0, 13);
        //                 }
        //                 if (slist) {
        //                     for (let l = 0; l < sprices.length; l++) {
        //                         console.log(i, "/", j, "/", l, "===>", sprices[l].innerText);
        //                         slist["sprice" + l] = await sprices[l].innerText;
        //                         await getCoffee();
        //                     }

        //                     if (slist["sprice1"] == 0) {
        //                         slist["sprice1"] = await document.querySelector(
        //                             "#J_PromoPrice > dd > div > span"
        //                         ).innerText;
        //                     }
        //                     if (i == $ar1length && j == $ar2length && k == $ar3length) {}
        //                 }
        //             }
        //         }
        //     }
        //     sendajax(skulist);
        // } else if (skulist && $ar1length > 0 && $ar2length > 0) {
        //     for (let i = 0; i < $ar1.length; i++) {
        //         await $ar1[i].click();
        //         await getCoffee();
        //         await getCoffee();
        //         await getCoffee();
        //         for (let j = 0; j < $ar2.length; j++) {
        //             await $ar2[j].click();
        //             let filtertxt = $ar1[i].innerText + " " + $ar2[j].innerText;
        //             filtertxt = filtertxt.trim();
        //             console.log("filtertxt-->", i, "/", j, "=", filtertxt);
        //             await getCoffee();
        //             await getCoffee();
        //             await getCoffee();
        //             let sprices = await document.querySelectorAll(".tm-price");
        //             let chk = 0;
        //             for (let z = 0; z < sprices.length; z++) {
        //                 console.log(sprices[z].innerText);
        //                 if (sprices[z].innerText.indexOf("-") > -1) {
        //                     chk = 1;
        //                 }
        //             }
        //             if (chk) {
        //                 await $ar2[j].click();
        //                 await getCoffee();
        //                 await getCoffee();
        //                 await getCoffee();
        //                 sprices = await document.querySelectorAll(".tm-price");
        //             }
        //             var slist = await skulist.find(s => s.names.indexOf(filtertxt) > -1);
        //             console.log("slist-->", slist);

        //             if (slist) {

        //             } else {
        //                 let skufilters = await window.location.href
        //                     .split("&")
        //                     .map(item => item.split("="))
        //                     .find(aa => aa[0] == "skuId");
        //                 console.log("skufilters==", skufilters);
        //                 let filtersku = "";
        //                 if (skufilters != undefined && skufilters.length > 0) {
        //                     filtersku = skufilters[1];
        //                     filtersku = await filtersku.substr(0, 13);
        //                     slist = await skulist.find(s => s.skuId.indexOf(filtersku) > -1);
        //                     console.log('new slist------------------------->', slist);
        //                 }
        //             }
        //             if (slist) {

        //                 for (let l = 0; l < sprices.length; l++) {
        //                     console.log(i, "/", j, "/", l, "===>", sprices[l].innerText);
        //                     slist["sprice" + l] = await sprices[l].innerText;
        //                     await getCoffee();
        //                 }

        //                 if (slist["sprice1"] == 0) {
        //                     slist["sprice1"] = await document.querySelector(
        //                         "#J_PromoPrice > dd > div > span"
        //                     ).innerText;
        //                 }
        //             }

        //         }
        //     }
        //     sendajax(skulist);
        // } else if (skulist && $ar1length > 0) {
        //     for (let i = 0; i < $ar1.length; i++) {
        //         await $ar1[i].click();
        //         await getCoffee();
        //         await getCoffee();
        //         await getCoffee();
        //         let filtertxt = $ar1[i].innerText;
        //         filtertxt = filtertxt.trim();
        //         console.log("filtertxt-->", i, filtertxt);
        //         let skufilters = window.location.href
        //             .split("&")
        //             .map(item => item.split("="))
        //             .find(aa => aa[0] == "skuId");
        //         console.log("skufilters==", skufilters);
        //         let filtersku = "";
        //         if (skufilters != undefined && skufilters.length > 0) {
        //             filtersku = skufilters[1];
        //             filtersku = filtersku.substr(0, 13);
        //         }
        //         let slist = skulist.find(s => s.skuId.indexOf(filtersku) > -1);
        //         console.log("slist-->", slist);
        //         await getCoffee();
        //         await getCoffee();
        //         await getCoffee();
        //         let sprices = await document.querySelectorAll(".tm-price");
        //         let chk = 0;
        //         for (let z = 0; z < sprices.length; z++) {
        //             console.log(sprices[z].innerText);
        //             if (sprices[z].innerText.indexOf("-") > -1) {
        //                 chk = 1;
        //             }
        //         }
        //         if (chk) {
        //             $ar1[i].click();
        //             await getCoffee();
        //             await getCoffee();
        //             await getCoffee();
        //             sprices = await document.querySelectorAll(".tm-price");
        //         }

        //         if (slist) {
        //             for (let l = 0; l < sprices.length; l++) {
        //                 console.log(i, l, "===>", sprices[l].innerText);
        //                 slist["sprice" + l] = await sprices[l].innerText;
        //                 await getCoffee();
        //             }

        //             if (slist["sprice1"] == 0) {
        //                 slist["sprice1"] = await document.querySelector(
        //                     "#J_PromoPrice > dd > div > span"
        //                 ).innerText;
        //             }

        //             if (i == $ar1length) {}
        //         }
        //     }
        //     sendajax(skulist);
        // } else {
        //     console.log("---------null-------------");
        // }
        // } else {
        //     await getCoffee();
        //     await getCoffee();
        //     console.log(
        //         "--------------no---skulist-------------------------------",
        //         $ar1length,
        //         $ar2length,
        //         $ar3length
        //     );
        //     // let name = await document.querySelector(
        //     //     "#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-detail-hd > *"
        //     // );
        //     // if (name.innerText != undefined) {
        //     //     name = await name.innerText;
        //     //     console.log("name-->", name);
        //     // }
        //     let localskulist = {
        //         skuId: "-",
        //         names: name,
        //         url: window.location.href,
        //         pvs: "-",
        //         price: "0",
        //         stock: "0",
        //         skuId: "-"
        //     };

        //     let sprices = [];
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     await getCoffee();
        //     sprices = await document.querySelectorAll(".tm-price");
        //     console.log("sprices-->", sprices);
        //     for (let j = 0; j < sprices.length; j++) {
        //         localskulist["sprice" + j] = await sprices[j].innerText;
        //     }

        //     skulist = [localskulist];
        //     console.log("skulsitarr-->", skulist);
        //     sendajax(skulist);
        // }

        // return null;
    }
};

document.onreadystatechange = async function() {
    console.log("document.readyState---->", document.readyState);
    if (document.readyState == "complete") {
        let skulist = await initdata();
        await console.log(
            "===================== SUCCESSED ============================="
        );
    }
};