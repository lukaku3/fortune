import { getAllByPlaceholderText } from "@testing-library/react";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import ReactDOM from "react-dom";


const fontColorBlack = 'rgba(0, 0, 0)';
const fontColorWhite = 'rgba(255,255,255)';
// const fontFamily = "'BIZ UDPGothic', sans-serif";
// const fontFamily = "'MS Pゴシック', serif";
// const fontFamily = "'MS Pゴシック'";
const fontFamily = "游ゴシック体";
const gender = ['女性用', '男性用'];
const wday = ["日", "月", "火", "水", "木", "金", "土"];
// メモ
const memoText = "17LIVEの顔だしでは、フルエール＆250BCギフトで聞くことが出来ます。";
// default image path
const defaultImgPath = './assets/images/default.png';

const MyCanvas = (props, ref) => {
    // contextを状態として持つ
    const [context, setContext] = useState(null);
    // 画像読み込み完了トリガー
    const [loaded, setLoaded] = useState(false);
    const [png, setPng] = useState(null)

    useImperativeHandle(
        ref,
        () => ({
            resetFunc() {
                afterInit()
                loadMyImage()
            },
            applyFunc() {
                drawTodayHint()
                drawLuckyColor()
                drawLuckyFood()
            },
            saveFunc() {
                const canvas = document.getElementById("canvas");
                let dataURL = canvas.toDataURL();
                setPng(dataURL)
                // add to personList
                let personData = {}
                personData.pid = props.pid
                personData.gender = props.gender
                personData.hint = document.getElementById('hintTextarea').value
                personData.food = document.getElementById('foodInput').value
                personData.color = document.getElementById('colorInput').value
                // personListから同じObjを検索し値を上書き
                let exists = false
                props.personList.filter(value => {
                    if (value.pid == props.pid && value.gender == props.gender) {
                        exists = true
                        value.hint = personData.hint
                        value.color = personData.color
                        value.food = personData.food
                    }
                })
                if (exists == false) props.personList.push(personData)
                // 画像保存
                saveImage()
                // 一覧へデータ書き込み準備
                let tRecords = document.querySelector('table > tbody > tr:nth-child(' + props.pid + ') > td:nth-child(' + (props.gender + 2) + ')');
                if (tRecords.querySelector('ul')) {
                    tRecords.querySelector('ul').remove()
                }
                let ul = document.createElement('ul')
                let lis = [
                    personData.hint,
                    personData.food,
                    personData.color
                ]
                lis.filter(value => {
                    let li = document.createElement('li')
                    li.innerHTML = value
                    ul.appendChild(li)
                })
                // 一覧へデータ書込
                tRecords.appendChild(ul)
            },
            updateTodayHint() {
                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                let todayHint = document.querySelector('table textarea').value;
                ctx.font = "bold 20px " + fontFamily;
                ctx.fillStyle = fontColorBlack;
                for (let i = 0; i < 10; i++) {
                    let y = 190 + (25 * i)
                    let hint = todayHint.slice(0, 9)
                    todayHint = todayHint.slice(9)
                    ctx.fillText(hint, 285, y);
                    if (!todayHint.length) return true;
                }
            },
        }),
    )
    // 画像保存
    const saveImage = () => {
        const canvas = document.getElementById("canvas");
        const now = new Date()
        const today = [now.getFullYear(), ('0' + (now.getMonth() + 1)).slice(-2), now.getDate()].join('') + "_" + props.pid + "_" + props.gender
        const filename = today + ".png";
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = filename;
        a.click();
    }

    const afterInit = () => {
        const canvas = document.getElementById("canvas")
        const canvasContext = canvas.getContext("2d")
        setContext(canvasContext)
    }
    const loadMyImage = () => {
        if (context !== null) {
            const img = new Image()
            img.src = defaultImgPath;
            img.onload = () => {
                context.drawImage(img, 0, 0)
                // 更にこれに続いて何か処理をしたい場合
                setLoaded(true)
                // 
                drawPersonId()
                drawDate()
                drawGender()
            }
        }
    }
    // 番号描画
    const drawPersonId = () => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = "bold 32px " + fontFamily;
        ctx.fillStyle = fontColorBlack;
        let personIdTxt = "「" + props.pid + "」の方"
        ctx.fillText(personIdTxt, 310, 155);
        // decorate underline
        var txw1 = ctx.measureText(personIdTxt);
        ctx.beginPath();
        ctx.strokeStyle = fontColorBlack
        ctx.moveTo(325, 160);
        ctx.lineTo(325 + txw1.width - 10, 160);
        ctx.stroke();
    }
    // 日付描画
    const drawDate = () => {
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        const now = new Date()
        const today = (now.getMonth() + 1) + "月" + now.getDate() + "日(" + wday[now.getDay()] + ")のヒント"
        ctx.font = "bold 30px " + fontFamily;
        ctx.fillStyle = fontColorBlack;
        ctx.fillText(today, 155, 110);
    }
    // 性別描画
    const drawGender = () => {
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        ctx.font = "bold 26px " + fontFamily;
        ctx.fillStyle = fontColorBlack;
        ctx.fillText(gender[props.gender], 30, 110);
    }
    // 今日のヒント描画
    const drawTodayHint = () => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        let todayHint = document.querySelector('table textarea').value;
        ctx.font = "bold 20px " + fontFamily;
        ctx.fillStyle = fontColorBlack;
        for (let i = 0; i < 10; i++) {
            let y = 190 + (25 * i)
            let hint = todayHint.slice(0, 9)
            todayHint = todayHint.slice(9)
            ctx.fillText(hint, 285, y);
            if (!todayHint.length) return true;
        }
    }
    // ラッキーフード描画
    const drawLuckyFood = () => {
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        ctx.font = "bold 14px " + fontFamily;
        ctx.fillStyle = fontColorWhite;
        let food = document.getElementById('foodInput').value
        let foodTxt = "ラッキーフードは、「" + food + "」"
        ctx.fillText(foodTxt, 15, 460);
        // decorate underline
        var txw1 = ctx.measureText(foodTxt);
        ctx.beginPath();
        ctx.strokeStyle = fontColorWhite
        ctx.moveTo(15, 463);
        ctx.lineTo(15 + txw1.width, 463);
        ctx.stroke();
    }
    // ラッキーカラー描画
    const drawLuckyColor = () => {
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        ctx.font = "bold 14px " + fontFamily;
        // ctx.font = "bold 15px " + fontFamily;
        ctx.fillStyle = fontColorWhite;
        let color = document.getElementById('colorInput').value
        let colorTxt = "ラッキーカラーは、「" + color + "」"
        ctx.fillText(colorTxt, 250, 460);
        // decorate underline
        var txw1 = ctx.measureText(colorTxt);
        ctx.beginPath();
        ctx.strokeStyle = fontColorWhite
        ctx.moveTo(250, 463);
        ctx.lineTo(250 + txw1.width, 463);
        ctx.stroke();
    }
    // メモ描画
    const drawMemoText = () => {
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        // ctx.font = "bold 14px " + fontFamily;
        ctx.font = "bold 15px " + fontFamily;
        ctx.fillStyle = fontColorWhite;
        ctx.fillText(memoText, 15, 480);
    }
    // personListより編集中のデータを取得
    const getMyData = () => {
        let myData = {};
        props.personList.filter(value => {
            if (value.pid == props.pid && value.gender == props.gender) {
                myData = value;
                return true;
            }
        })
        return myData;
    }
    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
    useEffect(() => {
        afterInit()
    }, [])
    // 状態にコンテキストが登録されたらそれに対して操作できる
    useEffect(() => {
        loadMyImage()
    }, [context])
    useEffect(() => {
        if (loaded) {
            // それに続く処理
            // 保存済みデータ呼び出し
            let myData = getMyData();
            if (myData) {
                document.getElementById('colorInput').value = (myData.color) ? myData.color : '';
                document.getElementById('foodInput').value = (myData.food) ? myData.food : '';
                document.querySelector('table textarea').value = (myData.hint) ? myData.hint : '';
                document.getElementById('reDraw').click()
            }
        }
    }, [loaded])
    return <canvas width="500" height="500" id="canvas"></canvas>
}

export default forwardRef(MyCanvas);
