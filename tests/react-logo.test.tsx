import {
  Color,
  Line2D,
  Node2D,
  PackedArray,
  Vector2,
  type Vector2Type,
} from "@inbestigator/godact";
import { createRenderer } from "../lib/internal/renderers/renderer.ts";
import { reconciler } from "../lib/internal/reconciler.ts";
import { assertEquals } from "@std/assert";

Deno.test("Render the React logo", () => {
  crypto.randomUUID = () => "00000000-0000-0000-0000-000000000000";
  const container = createRenderer();

  const root = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "godact",
    (error: Error) => console.error(error),
    null,
  );

  reconciler.updateContainer(<ReactLogo />, root, null);

  assertEquals(container.compileScript(), expectedSimpleScene);
});

function ReactLogo() {
  const color = Color(97, 218, 251, 255);
  const center = Vector2(576, 324);
  const ellipseRadius = Vector2(180, 60);
  const ellipseAngle = Math.PI / 3;
  const numPoints = 100;

  function createPoints(
    center: Vector2Type,
    radius: Vector2Type,
    rotation: number,
  ) {
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const x = center.x +
        radius.x * Math.cos(angle) * Math.cos(rotation) -
        radius.y * Math.sin(angle) * Math.sin(rotation);
      const y = center.y +
        radius.x * Math.cos(angle) * Math.sin(rotation) +
        radius.y * Math.sin(angle) * Math.cos(rotation);
      points.push(Vector2(x, y));
    }
    return points;
  }

  const centerCirclePoints = createPoints(
    center,
    Vector2(20, 20),
    0,
  );

  return (
    <Node2D name="ReactLogo">
      <Line2D
        name="Center"
        points={PackedArray<Vector2Type>(...centerCirclePoints)}
        width={4}
        default_color={color}
      />
      {[1, 2, 3].map((
        i,
      ) => {
        const points = createPoints(
          center,
          ellipseRadius,
          (i - 1) * ellipseAngle,
        );

        return (
          <Line2D
            name={`Ellipse ${i}`}
            key={`Ellipse ${i}`}
            points={PackedArray<Vector2Type>(...points)}
            width={4}
            default_color={color}
          />
        );
      })}
    </Node2D>
  );
}

export const expectedSimpleScene = `[gd_scene format=3]


[node name="ReactLogo" type="Node2D"]

[node name="Center" type="Line2D" parent="."]
points = PackedVector2Array(596, 324, 595.9605345685654, 325.25581039058625, 595.8422940262896, 326.5066646712861, 595.6457450145738, 327.7476262917145, 595.3716632225726, 328.9737977432971, 595.0211303259031, 330.180339887499, 594.595529717765, 331.36249105369353, 594.0965410493204, 332.51558583130145, 593.5261336008773, 333.63507348203433, 592.8865585100403, 334.7165358995799, 592.1803398874989, 335.7557050458495, 591.4102648555158, 336.7484797949738, 590.5793725484282, 337.6909421185738, 589.6909421185737, 338.57937254842824, 588.7484797949738, 339.4102648555158, 587.7557050458495, 340.180339887499, 586.71653589958, 340.8865585100403, 585.6350734820343, 341.5261336008773, 584.5155858313015, 342.0965410493204, 583.3624910536936, 342.59552971776503, 582.1803398874989, 343.0211303259031, 580.9737977432972, 343.37166322257264, 579.7476262917145, 343.6457450145738, 578.5066646712861, 343.84229402628955, 577.2558103905862, 343.96053456856544, 576, 344, 574.7441896094138, 343.96053456856544, 573.4933353287139, 343.84229402628955, 572.2523737082855, 343.6457450145738, 571.026202256703, 343.37166322257264, 569.8196601125011, 343.0211303259031, 568.6375089463064, 342.59552971776503, 567.4844141686985, 342.09654104932036, 566.3649265179657, 341.52613360087724, 565.28346410042, 340.8865585100403, 564.2442949541505, 340.180339887499, 563.2515202050262, 339.4102648555158, 562.3090578814263, 338.57937254842824, 561.4206274515718, 337.6909421185738, 560.5897351444842, 336.7484797949738, 559.8196601125011, 335.7557050458495, 559.1134414899597, 334.7165358995799, 558.4738663991227, 333.63507348203433, 557.9034589506796, 332.51558583130145, 557.404470282235, 331.3624910536936, 556.9788696740969, 330.180339887499, 556.6283367774274, 328.9737977432971, 556.3542549854262, 327.7476262917145, 556.1577059737104, 326.5066646712861, 556.0394654314346, 325.25581039058625, 556, 324, 556.0394654314346, 322.74418960941375, 556.1577059737104, 321.4933353287139, 556.3542549854262, 320.2523737082855, 556.6283367774274, 319.0262022567029, 556.9788696740969, 317.819660112501, 557.404470282235, 316.6375089463064, 557.9034589506796, 315.48441416869855, 558.4738663991227, 314.3649265179657, 559.1134414899597, 313.2834641004201, 559.8196601125011, 312.2442949541505, 560.5897351444842, 311.2515202050262, 561.4206274515718, 310.3090578814262, 562.3090578814263, 309.42062745157176, 563.2515202050262, 308.5897351444842, 564.2442949541505, 307.8196601125011, 565.28346410042, 307.1134414899597, 566.3649265179657, 306.4738663991227, 567.4844141686985, 305.9034589506796, 568.6375089463064, 305.40447028223497, 569.8196601125011, 304.9788696740969, 571.0262022567028, 304.62833677742736, 572.2523737082855, 304.3542549854262, 573.4933353287139, 304.15770597371045, 574.7441896094138, 304.03946543143456, 576, 304, 577.2558103905862, 304.03946543143456, 578.5066646712861, 304.15770597371045, 579.7476262917145, 304.3542549854262, 580.9737977432972, 304.62833677742736, 582.1803398874989, 304.9788696740969, 583.3624910536936, 305.40447028223497, 584.5155858313015, 305.9034589506796, 585.6350734820343, 306.4738663991227, 586.7165358995799, 307.1134414899597, 587.7557050458495, 307.819660112501, 588.7484797949738, 308.5897351444842, 589.6909421185737, 309.42062745157176, 590.5793725484282, 310.3090578814262, 591.4102648555158, 311.2515202050262, 592.1803398874989, 312.2442949541505, 592.8865585100403, 313.2834641004201, 593.5261336008773, 314.36492651796567, 594.0965410493204, 315.48441416869855, 594.595529717765, 316.6375089463064, 595.0211303259031, 317.819660112501, 595.3716632225726, 319.0262022567029, 595.6457450145738, 320.2523737082855, 595.8422940262896, 321.4933353287139, 595.9605345685654, 322.74418960941375, 596, 324)
width = 4
default_color = Color(0.3803921568627451, 0.8549019607843137, 0.984313725490196, 1)
[node name="Ellipse 1" type="Line2D" parent="."]
points = PackedVector2Array(756, 324, 755.6448111170889, 327.7674311717588, 754.5806462366061, 331.51999401385825, 752.811705131164, 335.24287887514345, 750.3449690031537, 338.9213932298913, 747.1901729331277, 342.54101966249686, 743.3597674598852, 346.08747316108065, 738.8688694438836, 349.54675749390435, 733.7352024078955, 352.90522044610293, 727.9790265903628, 356.1496076987398, 721.6230589874906, 359.2671151375484, 714.692383699642, 362.2454393849214, 707.2143529358541, 365.0728263557213, 699.2184790671639, 367.7381176452847, 690.7363181547641, 370.23079456654733, 681.8013454126451, 372.54101966249686, 672.4488230962194, 374.6596755301209, 662.7156613383088, 376.5784008026318, 652.640272481713, 378.28962314796115, 642.2624194832421, 379.7865891532951, 631.6230589874906, 381.0633909777092, 620.7641796896739, 382.11498966771785, 609.7286366254305, 382.93723504372133, 598.5599820415748, 383.52688207886865, 587.3022935152765, 383.8816037056963, 576, 384, 564.6977064847235, 383.8816037056963, 553.4400179584252, 383.52688207886865, 542.2713633745695, 382.93723504372133, 531.2358203103262, 382.11498966771785, 520.3769410125095, 381.0633909777092, 509.73758051675793, 379.7865891532951, 499.35972751828695, 378.28962314796115, 489.2843386616912, 376.5784008026318, 479.5511769037806, 374.6596755301209, 470.19865458735484, 372.54101966249686, 461.26368184523585, 370.23079456654733, 452.78152093283603, 367.73811764528466, 444.78564706414596, 365.0728263557213, 437.30761630035795, 362.2454393849214, 430.3769410125095, 359.2671151375484, 424.02097340963735, 356.1496076987398, 418.2647975921046, 352.90522044610293, 413.13113055611655, 349.54675749390435, 408.64023254011477, 346.0874731610807, 404.80982706687234, 342.54101966249686, 401.6550309968464, 338.9213932298913, 399.188294868836, 335.2428788751435, 397.41935376339404, 331.51999401385825, 396.3551888829111, 327.7674311717588, 396, 324, 396.3551888829111, 320.2325688282412, 397.419353763394, 316.48000598614175, 399.188294868836, 312.7571211248565, 401.6550309968464, 309.0786067701087, 404.80982706687234, 305.45898033750314, 408.64023254011477, 301.9125268389193, 413.13113055611643, 298.45324250609565, 418.2647975921045, 295.0947795538971, 424.02097340963724, 291.85039230126023, 430.3769410125094, 288.7328848624516, 437.30761630035795, 285.7545606150786, 444.7856470641459, 282.9271736442787, 452.781520932836, 280.26188235471534, 461.26368184523585, 277.7692054334526, 470.1986545873548, 275.45898033750314, 479.55117690378063, 273.3403244698791, 489.28433866169127, 271.4215991973682, 499.359727518287, 269.7103768520388, 509.7375805167579, 268.21341084670496, 520.3769410125094, 266.9366090222908, 531.2358203103261, 265.88501033228215, 542.2713633745695, 265.06276495627867, 553.4400179584252, 264.47311792113135, 564.6977064847237, 264.1183962943037, 576, 264, 587.3022935152763, 264.1183962943037, 598.5599820415748, 264.47311792113135, 609.7286366254303, 265.06276495627867, 620.7641796896739, 265.88501033228215, 631.6230589874905, 266.9366090222908, 642.2624194832421, 268.2134108467049, 652.6402724817129, 269.7103768520388, 662.7156613383087, 271.42159919736815, 672.4488230962193, 273.3403244698791, 681.8013454126451, 275.45898033750314, 690.736318154764, 277.7692054334526, 699.2184790671639, 280.2618823547153, 707.214352935854, 282.92717364427864, 714.692383699642, 285.7545606150786, 721.6230589874905, 288.7328848624516, 727.9790265903628, 291.85039230126023, 733.7352024078955, 295.09477955389707, 738.8688694438836, 298.45324250609565, 743.3597674598852, 301.9125268389193, 747.1901729331277, 305.45898033750314, 750.3449690031536, 309.0786067701087, 752.811705131164, 312.7571211248565, 754.580646236606, 316.48000598614175, 755.6448111170889, 320.2325688282412, 756, 324)
width = 4
default_color = Color(0.3803921568627451, 0.8549019607843137, 0.984313725490196, 1)
[node name="Ellipse 2" type="Line2D" parent="."]
points = PackedVector2Array(666, 479.88457268119896, 662.559714456792, 481.4606856713355, 658.7778172659948, 482.41537327207186, 654.6692338480364, 482.7448677676031, 650.2501789046338, 482.4478687936871, 645.5380924267747, 481.52554846958816, 640.5515708670398, 479.9815467722572, 635.3102937479001, 477.8219571710064, 629.8349459956332, 475.05530257936925, 624.1471363063689, 471.6925017190547, 618.2693118664376, 467.7468260287408, 612.2246697635812, 463.2338472877695, 606.0370654386454, 458.17137616144754, 599.730918539053, 452.5793919104874, 593.3311165456125, 446.47996354199313, 586.8629165530003, 439.8971627131713, 580.3518455915481, 432.8569687314977, 573.8235998837151, 425.38716602625937, 567.3039434328384, 417.5172344961056, 560.818606344382, 409.27823316535614, 554.3931832809653, 400.70267760822173, 548.0530324519232, 391.8244116246879, 541.8231755360381, 382.6784736744977, 535.7281989324065, 373.3009585963588, 529.7921567291529, 363.72887515810567, 524.0384757729337, 354, 518.4898632138764, 344.15272854759064, 513.1682168908317, 334.2259234825098, 508.09453891060764, 324.25876136922363, 503.2888527622492, 314.29057804303, 498.7701242934748, 304.3607133694875, 494.5561868611401, 294.508355987939, 490.66367095112537, 284.7723886518556, 487.10793854540634, 275.1912347763724, 483.9030224953287, 265.80270679862315, 481.0615711403552, 256.64385694932554, 478.5947983908483, 247.75083102455426, 476.512439471889, 239.1587257347973, 474.82271250279126, 230.90145019427385, 473.5322860639392, 223.0115920971519, 472.64625287894705, 215.5202891088076, 472.16810971600614, 208.45710597968514, 472.09974358773775, 201.8499178667337, 472.44142430401655, 195.72480032289798, 473.1918034071545, 190.1059263888235, 474.3479194936471, 185.0154711929087, 475.9052099014802, 180.47352443620412, 477.8575287168723, 176.49801110754038, 480.1971710293888, 173.10462074178645, 482.914903339703, 170.3067455004233, 486, 168.11542731880104, 489.44028554320806, 166.5393143286645, 493.2221827340051, 165.58462672792817, 497.3307661519637, 165.25513223239687, 501.74982109536614, 165.55213120631282, 506.46190757322523, 166.47445153041184, 511.44842913296026, 168.01845322774278, 516.6897062520999, 170.17804282899357, 522.1650540043668, 172.94469742063072, 527.852863693631, 176.30749828094528, 533.7306881335624, 180.25317397125917, 539.7753302364188, 184.7661527122305, 545.9629345613546, 189.82862383855246, 552.269081460947, 195.42060808951254, 558.6688834543876, 201.5200364580069, 565.1370834469996, 208.10283728682867, 571.648154408452, 215.14303126850228, 578.1764001162849, 222.6128339737406, 584.6960565671616, 230.4827655038945, 591.1813936556179, 238.72176683464383, 597.6068167190347, 247.2973223917782, 603.9469675480768, 256.17558837531203, 610.1768244639619, 265.32152632550236, 616.2718010675935, 274.69904140364116, 622.2078432708471, 284.2711248418944, 627.9615242270663, 293.99999999999994, 633.5101367861234, 303.84727145240925, 638.8317831091683, 313.77407651749013, 643.9054610893924, 323.74123863077625, 648.7111472377508, 333.70942195697006, 653.2298757065253, 343.6392866305125, 657.44381313886, 353.49164401206104, 661.3363290488746, 363.22761134814425, 664.8920614545937, 372.8087652236275, 668.0969775046713, 382.19729320137674, 670.9384288596448, 391.3561430506744, 673.4052016091517, 400.2491689754457, 675.487560528111, 408.84127426520274, 677.1772874972088, 417.0985498057261, 678.4677139360608, 424.9884079028481, 679.353747121053, 432.4797108911924, 679.8318902839937, 439.5428940203149, 679.9002564122623, 446.1500821332663, 679.5585756959834, 452.2751996771021, 678.8081965928455, 457.89407361117645, 677.6520805063528, 462.9845288070913, 676.0947900985199, 467.5264755637958, 674.1424712831276, 471.5019888924597, 671.8028289706112, 474.8953792582135, 669.0850966602969, 477.6932544995767, 666, 479.88457268119896)
width = 4
default_color = Color(0.3803921568627451, 0.8549019607843137, 0.984313725490196, 1)
[node name="Ellipse 3" type="Line2D" parent="."]
points = PackedVector2Array(486.00000000000006, 479.88457268119896, 482.9149033397031, 477.69325449957677, 480.19717102938887, 474.89537925821367, 477.8575287168724, 471.5019888924597, 475.90520990148025, 467.52647556379594, 474.34791949364717, 462.98452880709135, 473.19180340715457, 457.89407361117657, 472.4414243040166, 452.2751996771021, 472.0997435877378, 446.1500821332664, 472.16810971600626, 439.54289402031486, 472.6462528789471, 432.4797108911925, 473.5322860639392, 424.98840790284817, 474.8227125027913, 417.09854980572624, 476.51243947188914, 408.84127426520274, 478.5947983908483, 400.24916897544574, 481.0615711403552, 391.35614305067446, 483.90302249532874, 382.19729320137685, 487.10793854540634, 372.8087652236276, 490.66367095112537, 363.2276113481444, 494.5561868611401, 353.49164401206104, 498.7701242934748, 343.6392866305125, 503.2888527622492, 333.70942195697006, 508.09453891060764, 323.74123863077637, 513.1682168908317, 313.77407651749013, 518.4898632138764, 303.84727145240936, 524.0384757729337, 294, 529.7921567291529, 284.27112484189433, 535.7281989324065, 274.69904140364116, 541.8231755360381, 265.3215263255023, 548.053032451923, 256.17558837531215, 554.3931832809653, 247.29732239177827, 560.818606344382, 238.72176683464392, 567.3039434328384, 230.48276550389443, 573.8235998837151, 222.6128339737406, 580.3518455915481, 215.14303126850223, 586.8629165530003, 208.1028372868287, 593.3311165456124, 201.5200364580069, 599.730918539053, 195.4206080895126, 606.0370654386453, 189.82862383855252, 612.2246697635812, 184.7661527122305, 618.2693118664375, 180.2531739712592, 624.1471363063688, 176.3074982809453, 629.8349459956331, 172.94469742063075, 635.3102937479, 170.1780428289936, 640.5515708670398, 168.0184532277428, 645.5380924267747, 166.4744515304118, 650.2501789046337, 165.5521312063128, 654.6692338480362, 165.25513223239687, 658.7778172659947, 165.58462672792817, 662.559714456792, 166.53931432866446, 666, 168.11542731880104, 669.0850966602969, 170.30674550042326, 671.8028289706111, 173.1046207417864, 674.1424712831275, 176.49801110754038, 676.0947900985198, 180.4735244362041, 677.6520805063528, 185.01547119290868, 678.8081965928454, 190.1059263888235, 679.5585756959833, 195.7248003228979, 679.9002564122623, 201.8499178667336, 679.8318902839939, 208.45710597968505, 679.353747121053, 215.52028910880753, 678.4677139360608, 223.01159209715186, 677.1772874972088, 230.90145019427376, 675.487560528111, 239.1587257347972, 673.4052016091517, 247.75083102455423, 670.9384288596448, 256.6438569493255, 668.0969775046713, 265.8027067986232, 664.8920614545937, 275.1912347763724, 661.3363290488746, 284.7723886518557, 657.44381313886, 294.5083559879389, 653.2298757065253, 304.3607133694874, 648.7111472377508, 314.2905780430299, 643.9054610893924, 324.2587613692237, 638.8317831091683, 334.2259234825098, 633.5101367861236, 344.1527285475907, 627.9615242270663, 353.99999999999994, 622.2078432708472, 363.72887515810555, 616.2718010675935, 373.3009585963588, 610.1768244639619, 382.6784736744976, 603.9469675480768, 391.8244116246879, 597.6068167190348, 400.70267760822173, 591.181393655618, 409.2782331653561, 584.6960565671617, 417.5172344961054, 578.176400116285, 425.3871660262593, 571.648154408452, 432.85696873149766, 565.1370834469997, 439.89716271317127, 558.6688834543877, 446.4799635419931, 552.2690814609471, 452.5793919104874, 545.9629345613547, 458.1713761614475, 539.7753302364188, 463.23384728776955, 533.7306881335624, 467.74682602874077, 527.852863693631, 471.69250171905475, 522.1650540043668, 475.0553025793693, 516.6897062520999, 477.8219571710065, 511.4484291329603, 479.9815467722572, 506.4619075732253, 481.5255484695882, 501.7498210953663, 482.4478687936872, 497.33076615196376, 482.7448677676031, 493.22218273400523, 482.41537327207186, 489.44028554320806, 481.4606856713355, 486.00000000000006, 479.88457268119896)
width = 4
default_color = Color(0.3803921568627451, 0.8549019607843137, 0.984313725490196, 1)
`;
