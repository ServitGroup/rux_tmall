function getCoffee() {
    return new Promise(resolve => {
        setTimeout(() => resolve("☕"), 2000); // it takes 2 seconds to make coffee
    });
};

async function sendajax(skulist) {
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

async function getimgvdo() {
    let booth = await document.querySelector(".tb-booth");
    let imgpath = '';
    let vdopath = '';
    let price = [];
    let playbtn = document.querySelector("#J_DetailMeta > div.tm-clear > div.tb-gallery > div.tb-booth > i.tm-video-play.J_playVideo");
    if (playbtn) {
        await playbtn.click();
        await getCoffee();
    }
    if (booth) {
        imgpath = await document.querySelector("#J_ImgBooth").src;
        if (booth.getElementsByTagName("video").length) {
            vdopath = await booth.getElementsByTagName("video")[0].src;
        }
    }
    let prices = await document.querySelectorAll('.tm-price');
    for (let i = 0; i < prices.length; i++) {
        price['price' + i] = await prices[i].innerText;
    }
    let rs = { imgpath, vdopath, ...price };
    console.log(rs);
    return rs
}

async function getskuitem(skulist) {
    let skufilters = await window.location.href
        .split("&")
        .map(item => item.split("="))
        .find(aa => aa[0] == "skuId");
    console.log(skufilters);
    let filtersku = "";
    if (skufilters != undefined && skufilters.length > 0) {
        filtersku = skufilters[1];
        filtersku = filtersku.substr(0, 13);
    }
    let slist = skulist.find(s => s.skuId.indexOf(filtersku) > -1);
    return slist;
}

async function main() {
    if (window.location.href.indexOf("tmall.com") > -1 || window.location.href.indexOf('95095.com') || window.location.href.indexOf('liangxinyao.com')) {
        console.log(window.location.href.split('?')[0].split('/')[2], '==========OK===========');

        let html = await document.body.innerHTML;
        var skulist = await html.match(/skuList.*]/);
        if (skulist) {
            console.log("=========== SKULIST ====================");
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
            console.table(skulist);
        }

        let lists = await document.querySelectorAll('#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-key > div > div > dl');
        let arlength = [0, 0, 0, 0];
        if (lists.length > 0) {
            for (let i = 0; i < lists.length; i++) {
                let list = lists[i];
                let ul = await list.getElementsByTagName('a');
                arlength[i] = ul.length;
            }
            console.log(arlength);
        }
        let listone = [];
        let aone = [];
        let listtwo = [];
        let atwo = [];
        let listthree = [];
        let athree = [];
        let listfour = [];
        let afour = [];

        if (lists[0] != undefined) {
            listone = await lists[0].getElementsByTagName('li');
            aone = await lists[0].getElementsByTagName('a');
        }
        if (lists[1] != undefined) {
            listtwo = await lists[1].getElementsByTagName('li');
            atwo = await lists[1].getElementsByTagName('a');
        }
        if (lists[2] != undefined) {
            listthree = await lists[2].getElementsByTagName('li');
            athree = await lists[2].getElementsByTagName('a');
        }
        if (lists[3] != undefined) {
            listfour = await lists[3].getElementsByTagName('li');
            afour = await lists[3].getElementsByTagName('a');
        }

        for (let i = 0; i < arlength[0]; i++) {
            if (listone != undefined) {
                if (listone[i].className.indexOf('tb-selected') == -1) {
                    await aone[i].click();
                }
                console.log('i=-->', i, listone[i].className);
                await getCoffee();
                await getCoffee();
                console.log(arlength[1]);
                let slist = await getskuitem(skulist);
                if (arlength[1] == 0 && listone[i].className != "tb-out-of-stock") {
                    let rs = await getimgvdo();
                    Object.assign(slist, rs)
                } else {
                    console.log("tb-out-of-stock");
                    Object.assign(slist, { imgpath: '', vdopath: '', price0: 0, price1: 0 })
                }
            } else {
                let slist = await getskuitem(skulist);
                let rs = await getimgvdo();
                Object.assign(slist, rs)
            }
            for (let j = 0; j < arlength[1]; j++) {
                if (listtwo[j].className.indexOf('tb-selected') == -1) {
                    atwo[j].click();
                }
                console.log('j--->', j, listtwo[j].className);
                await getCoffee();
                await getCoffee();
                console.log(arlength[2]);
                let slist = await getskuitem(skulist);
                if (arlength[2] == 0 && listtwo[j].className != "tb-out-of-stock") {
                    let rs = await getimgvdo();
                    Object.assign(slist, rs)
                } else {
                    console.log("tb-out-of-stock");
                    Object.assign(slist, { imgpath: '', vdopath: '', price0: 0, price1: 0 })
                }
                for (let k = 0; k < arlength[2]; k++) {
                    if (listthree[k].className.indexOf('tb-selected') == -1) {
                        athree[k].click();
                    }
                    console.log('k--->', k, listthree[k].className);
                    await getCoffee();
                    await getCoffee();
                    console.log(arlength[3]);
                    let slist = await getskuitem(skulist);
                    if (arlength[3] == 0 && listthree[k].className != "tb-out-of-stock") {
                        let rs = await getimgvdo();
                        Object.assign(slist, rs)
                    } else {
                        console.log("tb-out-of-stock");
                        Object.assign(slist, { imgpath: '', vdopath: '', price0: 0, price1: 0 })
                    }
                    for (let l = 0; l < arlength[3]; l++) {
                        if (listfour[l].className.indexOf('tb-selected') == -1) {
                            afour[l].click();
                        }
                        console.log('l----', l, listfour[l].className);
                        await getCoffee();
                        await getCoffee();
                        let rs = await getimgvdo();
                        let slist = await getskuitem(skulist);
                        Object.assign(slist, rs)
                    }
                }
            }
        }
        await skulist.map(slist => {
            if (slist.stock == 0) {
                Object.assign(slist, { imgpath: '', vdopath: '', price0: 0, price1: 0 })
            }
        })
        console.table(skulist);
    }
}

main()