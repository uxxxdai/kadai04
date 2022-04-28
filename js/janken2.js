//グローバル変数定義
var chara_a = 0
var chara_b = 1
var chara_b2 = 2
var chara_b3 = 3
var chara_last = 0
var player_hand = 0;
var cpu_hand = 0;
var maxhp_a = 100;
var nowhp_a = maxhp_a;
var maxhp_b = 100;
var nowhp_b = maxhp_b;
var damage = 0;
var stage = 0
const charaname_a = ["ピカチュウ","ロコン(アローラ）","イーブイ","ポニータ（ガラル）","コリンク"]
const charaname_b = ["ピカチュウ","ロコン（アローラ）","イーブイ","ポニータ（ガラル）","コリンク","ザジアン","ザマゼンタ","ミュウ","ソルガレオ"]
const chara_imgs = ["Pikachu.png","alora-rokon.png","i-vy.png","garaluponi-ta.png","korinku.png"]
const charaname_last = ["ザジアン","ザマゼンタ","ミュウ","ソルガレオ"]
const chara_imgs_last = ["zajian.png","zamazenta.png","myu.png","solgareo.png"]
let hana = 200;
var memo = 0;
var key = "";
var value = 0;
var value_x =0;
var html ="";

//成績表
// 1.登録 クリックイベント
$("#save").on("click", function () {
    // alert(1);
    key = $("#key").val(); //入力されている文字を取得します
    // console.log(key, key.length)
    if(key.length > 10){alert("10文字以内で入力してください");
    }else{
    location.href = "#message_box";
    $(".name_base.chara_a").text(key + "：");
    // const memo = $("#memo").val();
    
    // console.log(key, "id=key");
    // console.log(memo, "id=memo");

    // for (let i = 0; i < (localStorage.length+0.1); i++) {
    value_x = localStorage.getItem(key);
    if(value_x > 0){memo = value_x;
    }else{memo = 0;
    localStorage.setItem(key, memo)}
}});

// 2.clear クリックイベント
$("#clear").on("click", function () {
    // alert(1);
    localStorage.clear();
    $("#list").empty(); 
    // この下消さない
  });

//3.ページ読み込み：保存データ取得表示
// html = `
// <thead>
// <tr>
// <th>おなまえ</th>
// <th>ごうけいてん</th>
// </tr>
// </thead>
// `;
// $("#list").append(html);  
for (let i = 0; i < localStorage.length; i++) {
    
    const key = localStorage.key(i);
    value = localStorage.getItem(key);
    // console.log(key);
    // console.log(value);

    const html = `
    <tbody>    
    <tr>
        <th>${key}</th>
        <td>${value}</td>
    </tr>
    </tbody>
    `;
    // console.log(html);
    // 画面に表示
    $("#list").append(html);  
}

$(document).ready(function() { 
    $("#list").tablesorter();
});

    // $(document).ready(function() { 
    // $("#list").tablesorter({
    //     sortList:[[1,1]]
    //     // headers:{
    //     //     0:{sorter:false},
    //     //     1:{sorter:"digit"}
    // });
    // });

    // 成績表に追加表示function
    function seiseki(){
        $("#list").empty();
        const html = `
        <thead>
            <tr>
            <th>おなまえ</th>
            <th>ごうけいてん</th>
            </tr>
        </thead>
        `; 
        $("#list").append(html);
        for (let i = 0; i < localStorage.length; i++) {
    
            const key = localStorage.key(i);
            value = localStorage.getItem(key);
            console.log(key);
            console.log(value);
        
            const html = `
            <tbody>
                <tr>
                    <th>${key}</th>
                    <td>${value}</td>
                </tr>
            </tbody>
            `;
            // console.log(html);
            $("#list").append(html);
            // var sort_value ={valueNames:["key","value"]};
            // var userlist = new list("list",sort_value);
            // userlist.sort("value",{order:"asc"})
          }
        }
        
    function sorting(){
          $("#list").tablesorter();
    }
        //   $(document).ready(function() { 
        //     $("#list").tablesorter({
        //         sortList:[[1,1]]
        //         // headers:{
        //         // 0:{sorter:false},
        //         // 1:{sorter:"digit"}
        //     });
        //     });
 
        //   const html = `
        //     <tr>
        //         <th>${key}</th>
        //         <td>${memo}</td>
        //     </tr>
        // `;

        // // 画面に表示
        // $("#list").append(html);
 
// 同じあいてともう一回ボタン
$(".btn.again").on("click", function again() {
    if(stage == 4){
    alert("さいしょにもどるをおしてね！");
    return;
    }else{
    player_hand = 0;
    cpu_hand = 0;
    maxhp_a = 100; 
    nowhp_a = maxhp_a;
    maxhp_b = 100; // bの最大H/P
    nowhp_b = maxhp_b;
    damage = 0;
    $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
    $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
    $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
    $(".message_contents").html("グー、チョキ、パーのどれかをえらんでね。かった方がこうげき！<br>（※こうげきりょくはグー：20、チョキ：30、パー：40で、<br>あたえるダメージはヒットのしかたによってかわるよ。<br><br>じぶんのキャラクターをかえたければ左上のハンバーガーメニューをおしてね！）");
    }
})

// さいしょにもどるボタン
$(".btn.reset").on("click", function reload(){
    location.reload()});

// じゃんけんボタン押したとき
    $(".option_box").on("click", function attack() {
        if(stage == 4){
            alert("さいしょにもどるをおしてね！");
            return;
        }else{
        const imgs = ["gu-300x300.png", "choki-300x300.png", "pa-300x300.png"];
        if(nowhp_a <= 0||nowhp_b <= 0){
            alert("同じあいてとたたかいたければ「同じあいてともう一回！」を押してね");
        }else{
            $(".message_contents").text("じゃーんけーん");
        setTimeout(() => {
            $(".message_contents").text("ぽん！！！");
            player_hand = $(this).val();
            cpu_hand = Math.floor(Math.random()*3);
            $(".battle_hand.chara_a img").attr("src","images/"+ imgs[player_hand]);
            $(".battle_hand.chara_b img").attr("src","images/"+ imgs[cpu_hand]);
        
            // 勝ち負け判定
            setTimeout(() => {
                if (player_hand == cpu_hand){
                    $(".message_contents").text("あいこ！じゃんけんをもう一度えらんでね。");}
                else if(player_hand==0&&cpu_hand==1||player_hand==1&&cpu_hand==2||player_hand==2&&cpu_hand==0){
                    $(".message_contents").text("じゃんけんにかった！" + charaname_a[chara_a] + "のこうげき！");
                    setTimeout(() => {
                            // ダメージポイント計算とゲージの減少
                            const random = Math.floor(Math.random() * 11);
                            damage = Math.floor((1-(random-5)/100*6)* (Number(player_hand)+2)*10);
                            damage = damage *5 //検証用に5倍の攻撃力
                            // console.log(random);
                            // console.log(player_hand);
                            // console.log(damage);
                            // console.log(nowhp_a);
                            nowhp_b = nowhp_b - damage;
                            // console.log(damage);
                            // console.log(nowhp_b);
                            if (nowhp_b > 0) {
                                if (random == 0) {
                                    $(".message_contents").text("こうげきをかわされた。");
                                    nowhp_b = nowhp_b + damage;
                                }else if (random > 0 && random <=3){
                                    $(".message_contents").text("クリティカルヒット！" + charaname_b[chara_b] + "に " + damage + " のダメージを与えた");
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
                                }else if(random > 3 && random <=7){
                                    $(".message_contents").text("まぁまぁのあたりだ！" + charaname_b[chara_b] + "に " + damage + " のダメージを与えた");
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
                                }else if(random >= 7 && random <=10){
                                    $(".message_contents").text("よわいあたりだ！" + charaname_b[chara_b] + "に " + damage + " のダメージを与えた");
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
                                }
                                }else {
                                    $(".message_contents").text(charaname_b[chara_b] + "に " + damage + " のダメージを与えた");
                                setTimeout(() => {
                                    $(".message_contents").html(charaname_b[chara_b] + "はちからつきた。<br>" + charaname_a[chara_a] + "のかち！");
                                    $(".hp_now.chara_b").text("0/" + maxhp_b);
                                    $(".hp_now.chara_b").width("0" + "px");
                                    setTimeout(() => {
                                    stage = stage + 1;
                                    next();
                                    },2000); 
                                    // $("#charaid_b").rotate(180);
                                    // monsterballback_b();
                                },1000);    
                        }
                    }, 1000);
                    }
                else{$(".message_contents").text("じゃんけんに負けた！" + charaname_b[chara_b] + "のこうげき！");
                    setTimeout(() => {
                        const random = Math.floor(Math.random() * 11);
                        damage = Math.floor((1-(random-5)/100*6)* (Number(cpu_hand)+2)*10);
                        // console.log(random);
                        // console.log(cpu_hand);
                        // console.log(damage);
                        nowhp_a = nowhp_a - damage;
                        // console.log(damage);
                        // console.log(nowhp_a);
                        if (nowhp_a > 0) {
                            if (random == 0) {
                                $(".message_contents").text("こうげきをかわした。");
                                nowhp_a = nowhp_a + damage;
                            }else if(random > 0 && random <=3){
                                $(".message_contents").text("クリティカルヒット！" + charaname_a[chara_a] + "は " + damage + " のダメージを受けた");
                                $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                                $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
                            }else if(random > 3 && random <=7){
                                $(".message_contents").text("まぁまぁのあたりだ！" + charaname_a[chara_a] + "は " + damage + " のダメージを受けた");
                                $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                                $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
                            }else if(random > 7 && random <=10){
                                $(".message_contents").text("よわいあたりだ！" + charaname_a[chara_a] + "は " + damage + " のダメージを受けた");
                                $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                                $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
                            }
                        }else {
                            $(".message_contents").text( charaname_a[chara_a] + "は " + damage + " のダメージを受けた");
                        setTimeout(() => {
                            $(".message_contents").html(charaname_a[chara_a] + "はちからつきた。<br>" + charaname_b[chara_b] + "のかち！<br>ゲームおしまい。”さいしょからもう一回！”を押してね。");
                            $(".hp_now.chara_a").text("0/" + maxhp_a);
                            $(".hp_now.chara_a").width("0" + "px");
                            // $("#charaid_a").rotate(180);
                            // monsterballback_a();
                        },1000);
                    }
                    }, 1000);  
                }   
            }, 1000);
        }, 1000);
        }
        }
    })

//モンスターボールに戻る
function monsterballback_a(){
    $(".battle_character.chara_a img").attr("src","images/"+ "monsterball.jpg");
}
function monsterballback_b(){
    $(".battle_character.chara_b img").attr("src","images/"+ "monsterball.jpg");
}

//ハンバーガーメニュー用
(function($) {
    var $nav   = $('#navArea');
    var $btn   = $('.toggle_btn');
    var $mask  = $('#mask');
    var open   = 'open'; // class
    // menu open close
    $btn.on( 'click', function() {
      if (!$nav.hasClass( open ) ) {
        $nav.addClass( open );
      } else {
        $nav.removeClass( open );
      }
    });
    // mask close
    $mask.on('click', function() {
      $nav.removeClass( open );
    });
  })(jQuery);

//次の相手に進むfunction
//   $(".btn.next").on("click", function next() {
function next() {
// stage = 4; //検証用
console.log(stage);
  if(stage == 0){
      alert("あいてをたおしたら次に進めるよ");
    }else if (stage < 3){

        if(stage == 1){
            chara_b = chara_b2;
            $(function(){
                $(".hako.chara_a img").attr("src","images/white box.jpeg");
                $(".hako.chara_a2 img").attr("src","images/"+ chara_imgs[chara_a]);
                $(".hako.chara_b").css("background-color","grey");
                $(".hako.chara_b img").css("opacity","0.3");
            })
            memo = +memo + 1;
            console.log(key);
            console.log(memo);
            localStorage.setItem(key, memo);
            seiseki();
            sorting();

        }
        else if(stage == 2){
            chara_b = chara_b3;
            $(function(){
                $(".hako.chara_a2 img").attr("src","images/white box.jpeg");
                $(".hako.chara_a3 img").attr("src","images/"+ chara_imgs[chara_a]);
                $(".hako.chara_b2").css("background-color","grey");
                $(".hako.chara_b2 img").css("opacity","0.3");
            })
            memo = +memo + 2;
            localStorage.setItem(key, memo);
            seiseki();
            sorting();
        };
        player_hand = 0;
        cpu_hand = 0;
        maxhp_a = 100; 
        nowhp_a = maxhp_a;
        maxhp_b = 100; // bの最大H/P
        nowhp_b = maxhp_b;
        damage = 0;
        $(".name.chara_b").text(charaname_b[chara_b]);
        $(".battle_character.chara_b img").attr("src","images/"+ chara_imgs[chara_b]);
        $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
        $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
        $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
        $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
        setTimeout(() => {
            $(".message_contents").html("つぎのあいて" + charaname_b[chara_b] + "が現れた！！！<br>バトル開始！自分のじゃんけんをえらんでおしてね")
        },1000);
    }
    else if (stage == 3){
    memo = +memo + 3;
    localStorage.setItem(key, memo);
    seiseki();
    sorting();
    $(".message_contents").text("きゅうにあたりにきりがたちこめてなにも見えなくなった．．．")
      setTimeout(() => {
        $(".message_contents").text("な、な、な、な、なんと！！！！")
      setTimeout(() => {
        const random = Math.floor(Math.random() * 4);
        chara_last = random; 
          chara_b = chara_last + 5; //メッセージボックスのキャラBを配列からとるために設定。キャラの数が増えたら要修正
          player_hand = 0;
          cpu_hand = 0;
          maxhp_a = 100; 
          nowhp_a = maxhp_a;
          maxhp_b = 100; 
          nowhp_b = maxhp_b;
          damage = 0;
          $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
          $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
          $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
          $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
          $(".name.chara_b").text(charaname_last[chara_last]);
          $(".battle_character.chara_b img").attr("src","images/"+ chara_imgs_last[chara_last]);
          $(".hako.chara_last img").attr("src","images/"+ chara_imgs_last[chara_last]);
            $(function(){
                $(".hako.chara_a3 img").attr("src","images/white box.jpeg");
                $(".hako.chara_a_last img").attr("src","images/"+ chara_imgs[chara_a]);
                $(".hako.chara_b3").css("background-color","grey");
                $(".hako.chara_b3 img").css("opacity","0.3");
            })
            $(".message_contents").html("伝説のポケモン " + charaname_b[chara_b] + " が現れた！！！<br><br>バトル開始！自分のじゃんけんをえらんでおしてね");
        },2000);
      },2000);
    
    }
  else if(stage == 4){
    memo = +memo + 4;
    localStorage.setItem(key, memo);
    seiseki();
    sorting();
    $(".message_contents").html("ゲームクリア おめでとう！！！<br><br>ほかのでんせつのポケモンとあいたかったらまたプレイしてね！");
    $(".message_contents").css({"font-size":"20px","color":"red","font-weight":"bold"});
    hanafubuki(200);
    }
  else{alert("バグ");}
}

// 自分のキャラを選択
$(".btn2").on("click", function change_restart() {
    hanafubuki(0);
    chara_a = $(".pulldown").val();
    var randoms = [];
    for(i = 1; i <= 3 ;i++){
    while(true){
        var tmp =  Math.floor(Math.random() * 5);
        if(!randoms.includes(tmp)){
            randoms.push(tmp);
            break;
        }
    }}
    console.log(randoms[0],randoms[1],randoms[2]);
    chara_b = randoms[0];
    chara_b2 = randoms[1];
    chara_b3 = randoms[2];

    player_hand = 0;
    cpu_hand = 0;
    maxhp_a = 100; 
    nowhp_a = maxhp_a;
    maxhp_b = 100; // bの最大H/P
    nowhp_b = maxhp_b;
    damage = 0;
    stage = 0;
    $(".name.chara_a").text(charaname_a[chara_a]);
    $(".name.chara_b").text(charaname_b[chara_b]);
    $(".battle_character.chara_a img").attr("src","images/"+ chara_imgs[chara_a]);
    $(".battle_character.chara_b img").attr("src","images/"+ chara_imgs[chara_b]);

    $(".hako.chara_a img").attr("src","images/"+ chara_imgs[chara_a]);
    $(".hako.chara_a2 img").attr("src","images/white box.jpeg");
    $(".hako.chara_a3 img").attr("src","images/white box.jpeg");
    $(".hako.chara_a_last img").attr("src","images/white box.jpeg");
    $(".hako.chara_b img").attr("src","images/"+ chara_imgs[chara_b]);
    $(".hako.chara_b img").css({"background":"white","opacity":"1"});
    $(".hako.chara_b2 img").css({"background":"white","opacity":"1"});
    $(".hako.chara_b3 img").css({"background":"white","opacity":"1"});
    $(".hako.chara_b2 img").attr("src","images/"+ chara_imgs[chara_b2]);
    $(".hako.chara_b3 img").attr("src","images/"+ chara_imgs[chara_b3]);
    $(".hako.chara_last img").attr("src","images/hatena.jpg");

    $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
    $(".hp_now.chara_a").width(350 / maxhp_a * nowhp_a + "px");
    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
    $(".hp_now.chara_b").width(350 / maxhp_b * nowhp_b + "px");
    $(".message_contents").html("グー、チョキ、パーのどれかを選んでね。勝った方がこうげき！<br>（※こうげきりょくはグー：20、チョキ：30、パー：40で、<br>あたえるダメージはヒットのつよさによってかわるよ！）");
    $(".message_contents").css({"color":"black","font-weight":"bold","font-size":"16px"})
})

// ゲームクリアはなふぶき
function hanafubuki(hana){
particlesJS("particles-js",{
	"particles":{
		"number":{
			"value":hana,//この数値を変更すると紙吹雪の数が増減できる
			"density":{
				"enable":false,
				"value_area":400
			}
		},
		"color": {
        "value": ["#EA5532", "#F6AD3C", "#FFF33F", "#00A95F", "#00ADA9", "#00AFEC","#4D4398", "#E85298"]//紙吹雪の色の数を増やすことが出来る
		},
		"shape":{
			"type":"polygon",//形状はpolygonを指定
			"stroke":{
				"width":0,
			},
			"polygon":{
				"nb_sides":5//多角形の角の数
			}
			},
			"opacity":{
				"value":1,
				"random":false,
				"anim":{
					"enable":true,
					"speed":20,
					"opacity_min":0,
					"sync":false
				}
			},
			"size":{
				"value":5.305992965476349,
				"random":true,//サイズをランダムに
				"anim":{
					"enable":true,
					"speed":1.345709068776642,
					"size_min":0.8,
					"sync":false
				}
			},
			"line_linked":{
				"enable":false,
			},
			"move":{
				"enable":true,
			"speed":10,//この数値を小さくするとゆっくりな動きになる
			"direction":"bottom",//下に向かって落ちる
			"random":false,//動きはランダムにならないように
			"straight":false,//動きをとどめない
			"out_mode":"out",//画面の外に出るように描写
			"bounce":false,//跳ね返りなし
				"attract":{
					"enable":false,
					"rotateX":600,
					"rotateY":1200
				}
			}
		},
		"interactivity":{
			"detect_on":"canvas",
			"events":{
				"onhover":{
					"enable":false,
				},
				"onclick":{
					"enable":false,
				},
				"resize":true
			},
		},
		"retina_detect":true
	});
}