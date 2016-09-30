(* Content-type: application/vnd.wolfram.cdf.text *)

(*** Wolfram CDF File ***)
(* http://www.wolfram.com/cdf *)

(* CreatedBy='Mathematica 10.0' *)

(*************************************************************************)
(*                                                                       *)
(*  The Mathematica License under which this file was created prohibits  *)
(*  restricting third parties in receipt of this file from republishing  *)
(*  or redistributing it by any means, including but not limited to      *)
(*  rights management or terms of use, without the express consent of    *)
(*  Wolfram Research, Inc. For additional information concerning CDF     *)
(*  licensing and redistribution see:                                    *)
(*                                                                       *)
(*        www.wolfram.com/cdf/adopting-cdf/licensing-options.html        *)
(*                                                                       *)
(*************************************************************************)

(*CacheID: 234*)
(* Internal cache information:
NotebookFileLineBreakTest
NotebookFileLineBreakTest
NotebookDataPosition[      1064,         20]
NotebookDataLength[     21119,        487]
NotebookOptionsPosition[     21189,        469]
NotebookOutlinePosition[     21829,        492]
CellTagsIndexPosition[     21786,        489]
WindowFrame->Normal*)

(* Beginning of Notebook Content *)
Notebook[{

Cell[CellGroupData[{
Cell[TextData[StyleBox["Cellular automata", "Subsection",
 FontWeight->"Bold"]], "Chapter",
 CellChangeTimes->{{3.6803807119200907`*^9, 3.680380781380382*^9}}],

Cell["OWN", "Text",
 CellChangeTimes->{{3.680574374050673*^9, 3.680574388821733*^9}, {
  3.680574437983444*^9, 3.680574448328114*^9}, {3.680574505182827*^9, 
  3.680574512525363*^9}},
 TextAlignment->Left,
 FontSize->240,
 FontWeight->"Bold"],

Cell[TextData[StyleBox["What is it all about",
 FontSize->36,
 FontColor->GrayLevel[0.85]]], "Text",
 CellChangeTimes->{{3.680574522099492*^9, 3.680574529819189*^9}}],

Cell["A rule is represented by a number.", "Text",
 CellChangeTimes->{{3.680380892914592*^9, 3.680380936535832*^9}}],

Cell[TextData[{
 Cell[BoxData[
  FormBox[GridBox[{
     {
      StyleBox["\[FilledSquare]\[FilledSquare]\[FilledSquare]",
       FontSize->18], 
      StyleBox["\[FilledSquare]\[FilledSquare]\[EmptySquare]",
       FontSize->18]},
     {
      StyleBox["\[FilledSquare]",
       FontSize->18], 
      StyleBox["\[EmptySquare]",
       FontSize->18]}
    }], TraditionalForm]]],
 "\[LineSeparator]"
}], "Text",
 CellChangeTimes->{{3.680394751836269*^9, 3.680394934993333*^9}, {
   3.680395162181451*^9, 3.6803951902701893`*^9}, 3.680455010616021*^9}],

Cell[CellGroupData[{

Cell[BoxData[{
 RowBox[{
  RowBox[{
   RowBox[{
    RowBox[{"showMatrix", "[", 
     RowBox[{"aa_", ",", "imageSize_"}], "]"}], ":=", 
    RowBox[{"ArrayPlot", "[", 
     RowBox[{"aa", ",", 
      RowBox[{"Mesh", "\[Rule]", "None"}], ",", 
      RowBox[{"MeshStyle", "\[Rule]", 
       RowBox[{"Directive", "[", 
        RowBox[{
         RowBox[{"Thickness", "[", "0.001", "]"}], ",", "LightGray"}], 
        "]"}]}], ",", 
      RowBox[{"ImageSize", "\[Rule]", "imageSize"}]}], "]"}]}], ";"}], 
  "\[IndentingNewLine]"}], "\[IndentingNewLine]", 
 RowBox[{
  RowBox[{
   RowBox[{"rule", "[", "n_", "]"}], ":=", 
   RowBox[{
    RowBox[{"IntegerDigits", "[", 
     RowBox[{"n", ",", "2"}], "]"}], "~", "PadLeft", "~", "8"}]}], 
  ";"}], "\[IndentingNewLine]", 
 RowBox[{
  RowBox[{
   RowBox[{
    RowBox[{"newValue", "[", 
     RowBox[{"r_", ",", "a_", ",", "i_"}], "]"}], ":=", " ", 
    RowBox[{"r", "\[LeftDoubleBracket]", 
     RowBox[{
      RowBox[{"FromDigits", "[", 
       RowBox[{
        RowBox[{"{", 
         RowBox[{
          RowBox[{"a", "\[LeftDoubleBracket]", 
           RowBox[{"i", "-", "1"}], "\[RightDoubleBracket]"}], ",", 
          RowBox[{"a", "\[LeftDoubleBracket]", "i", "\[RightDoubleBracket]"}],
           ",", 
          RowBox[{"a", "\[LeftDoubleBracket]", 
           RowBox[{"i", "+", "1"}], "\[RightDoubleBracket]"}]}], "}"}], ",", 
        "2"}], "]"}], " ", "+", "1"}], "\[RightDoubleBracket]"}]}], ";"}], 
  "\[IndentingNewLine]"}], "\[IndentingNewLine]", 
 RowBox[{
  RowBox[{
   RowBox[{
    RowBox[{"newRow", "[", 
     RowBox[{"r_", ",", "aa_", ",", "nCols_"}], "]"}], ":=", 
    RowBox[{"Join", "[", 
     RowBox[{
      RowBox[{"{", "0", "}"}], ",", " ", 
      RowBox[{"Table", "[", 
       RowBox[{
        RowBox[{"newValue", "[", 
         RowBox[{"r", ",", 
          RowBox[{"aa", "\[LeftDoubleBracket]", 
           RowBox[{"Length", "[", "aa", "]"}], "\[RightDoubleBracket]"}], ",",
           "i"}], "]"}], ",", 
        RowBox[{"{", 
         RowBox[{"i", ",", "2", ",", 
          RowBox[{"nCols", "-", "1"}]}], "}"}]}], "]"}], ",", 
      RowBox[{"{", "0", "}"}]}], "]"}]}], ";"}], 
  "\[IndentingNewLine]"}], "\[IndentingNewLine]", 
 RowBox[{
  RowBox[{
   RowBox[{"buildMatrix1", "[", 
    RowBox[{"nRows_", ",", "nCols_", ",", "rulNum_"}], "]"}], ":=", " ", 
   RowBox[{"Module", "[", 
    RowBox[{
     RowBox[{"{", 
      RowBox[{"aa", ",", "a", ",", "r"}], "}"}], ",", "\[IndentingNewLine]", 
     RowBox[{
      RowBox[{"aa", "=", 
       RowBox[{"{", "}"}]}], ";", "\[IndentingNewLine]", 
      RowBox[{"r", " ", "=", 
       RowBox[{"rule", "[", "rulNum", "]"}]}], ";", " ", 
      "\[IndentingNewLine]", 
      RowBox[{"a", "=", 
       RowBox[{"Table", "[", 
        RowBox[{"0", ",", 
         RowBox[{"{", 
          RowBox[{"i", ",", "1", ",", "nCols"}], "}"}]}], "]"}]}], ";", " ", 
      RowBox[{
       RowBox[{"a", "\[LeftDoubleBracket]", 
        RowBox[{
         RowBox[{"Quotient", "[", 
          RowBox[{"nCols", ",", "2"}], "]"}], "+", "1"}], 
        "\[RightDoubleBracket]"}], "=", "1"}], ";", " ", 
      "\[IndentingNewLine]", 
      RowBox[{"aa", "=", 
       RowBox[{"Append", "[", 
        RowBox[{"aa", ",", "a"}], "]"}]}], ";", "\[IndentingNewLine]", 
      RowBox[{"Do", "[", "  ", 
       RowBox[{
        RowBox[{
         RowBox[{"aa", "=", " ", 
          RowBox[{"Append", "[", 
           RowBox[{"aa", ",", 
            RowBox[{"newRow", "[", 
             RowBox[{"r", ",", "aa", ",", "nCols"}], "]"}]}], "]"}]}], ";"}], 
        " ", ",", "  ", 
        RowBox[{"{", 
         RowBox[{"nRows", "-", "1"}], "}"}]}], "  ", "]"}], ";", 
      "\[IndentingNewLine]", 
      RowBox[{"Return", "[", "aa", "]"}], ";"}]}], "\[IndentingNewLine]", 
    "]"}]}], "\[IndentingNewLine]", "\[IndentingNewLine]", 
  "\[IndentingNewLine]", 
  RowBox[{"(*", " ", 
   RowBox[{"Second", " ", 
    RowBox[{"version", ".", " ", "Prebuit"}], " ", 
    RowBox[{"array", ".", " ", "No"}], " ", 
    RowBox[{"appends", ".", " ", "For"}], " ", "loop"}], " ", 
   "*)"}]}], "\[IndentingNewLine]", 
 RowBox[{
  RowBox[{
   RowBox[{"buildMatrix2", "[", 
    RowBox[{"nRows_", ",", "nCols_", ",", "rulNum_"}], "]"}], ":=", " ", 
   RowBox[{"Module", "[", 
    RowBox[{
     RowBox[{"{", 
      RowBox[{"aa", ",", "r"}], "}"}], ",", "\[IndentingNewLine]", 
     RowBox[{
      RowBox[{"aa", "=", 
       RowBox[{"Table", "[", 
        RowBox[{"0", ",", 
         RowBox[{"{", 
          RowBox[{"i", ",", "1", ",", "nRows"}], "}"}], ",", 
         RowBox[{"{", 
          RowBox[{"j", ",", "1", ",", "nCols"}], "}"}]}], "]"}]}], ";", " ", 
      RowBox[{
       RowBox[{
        RowBox[{"aa", "\[LeftDoubleBracket]", "1", "\[RightDoubleBracket]"}], 
        "\[LeftDoubleBracket]", 
        RowBox[{
         RowBox[{"Quotient", "[", 
          RowBox[{"nCols", ",", "2"}], "]"}], "+", "1"}], 
        "\[RightDoubleBracket]"}], "=", "1"}], ";", "\[IndentingNewLine]", 
      RowBox[{"r", " ", "=", 
       RowBox[{"rule", "[", "rulNum", "]"}]}], ";", " ", 
      "\[IndentingNewLine]", "\[IndentingNewLine]", 
      RowBox[{"For", "[", 
       RowBox[{
        RowBox[{"ir", "=", "2"}], ",", 
        RowBox[{"ir", "<=", "nRows"}], ",", " ", 
        RowBox[{"ir", "++"}], ",", "\[IndentingNewLine]", 
        RowBox[{"For", "[", 
         RowBox[{
          RowBox[{"ic", "=", "2"}], ",", 
          RowBox[{"ic", "<", "nCols"}], ",", " ", 
          RowBox[{"ic", "++"}], ",", "\[IndentingNewLine]", 
          RowBox[{
           RowBox[{
            RowBox[{
             RowBox[{
             "aa", "\[LeftDoubleBracket]", "ir", "\[RightDoubleBracket]"}], 
             "\[LeftDoubleBracket]", "ic", "\[RightDoubleBracket]"}], "=", 
            RowBox[{"newValue", "[", 
             RowBox[{"r", ",", 
              RowBox[{"aa", "\[LeftDoubleBracket]", 
               RowBox[{"ir", "-", "1"}], "\[RightDoubleBracket]"}], ",", 
              "ic"}], "]"}]}], ";"}]}], " ", "\[IndentingNewLine]", "]"}]}], 
       "\[IndentingNewLine]", "]"}], ";", "\[IndentingNewLine]", 
      "\[IndentingNewLine]", "aa"}]}], "\[IndentingNewLine]", "]"}]}], 
  "\[IndentingNewLine]", "\[IndentingNewLine]", 
  RowBox[{"(*", " ", 
   RowBox[{"Second", " ", 
    RowBox[{"version", ".", " ", "Prebuilt"}], " ", 
    RowBox[{"array", ".", " ", "No"}], " ", 
    RowBox[{"appends", ".", " ", "Do"}], " ", 
    RowBox[{"loop", "."}]}], "*)"}]}], "\[IndentingNewLine]", 
 RowBox[{
  RowBox[{
   RowBox[{"buildMatrix3", "[", 
    RowBox[{"nRows_", ",", "nCols_", ",", "rulNum_"}], "]"}], ":=", " ", 
   RowBox[{"Module", "[", 
    RowBox[{
     RowBox[{"{", 
      RowBox[{"aa", ",", "r"}], "}"}], ",", "\[IndentingNewLine]", 
     RowBox[{
      RowBox[{"aa", "=", 
       RowBox[{"Table", "[", 
        RowBox[{"0", ",", 
         RowBox[{"{", 
          RowBox[{"i", ",", "1", ",", "nRows"}], "}"}], ",", 
         RowBox[{"{", 
          RowBox[{"j", ",", "1", ",", "nCols"}], "}"}]}], "]"}]}], ";", " ", 
      RowBox[{
       RowBox[{
        RowBox[{"aa", "\[LeftDoubleBracket]", "1", "\[RightDoubleBracket]"}], 
        "\[LeftDoubleBracket]", 
        RowBox[{
         RowBox[{"Quotient", "[", 
          RowBox[{"nCols", ",", "2"}], "]"}], "+", "1"}], 
        "\[RightDoubleBracket]"}], "=", "1"}], ";", "\[IndentingNewLine]", 
      RowBox[{"r", " ", "=", 
       RowBox[{"rule", "[", "rulNum", "]"}]}], ";", " ", 
      "\[IndentingNewLine]", 
      RowBox[{"Do", "[", "\[IndentingNewLine]", 
       RowBox[{
        RowBox[{
         RowBox[{
          RowBox[{
           RowBox[{
           "aa", "\[LeftDoubleBracket]", "ir", "\[RightDoubleBracket]"}], 
           "\[LeftDoubleBracket]", "ic", "\[RightDoubleBracket]"}], "=", 
          RowBox[{"newValue", "[", 
           RowBox[{"r", ",", 
            RowBox[{"aa", "\[LeftDoubleBracket]", 
             RowBox[{"ir", "-", "1"}], "\[RightDoubleBracket]"}], ",", "ic"}],
            "]"}]}], ";"}], "\[IndentingNewLine]", ",", 
        RowBox[{"{", 
         RowBox[{"ir", ",", "2", ",", "nRows"}], "}"}], ",", 
        RowBox[{"{", 
         RowBox[{"ic", ",", "2", ",", 
          RowBox[{"nCols", "-", "1"}]}], "}"}]}], "\[IndentingNewLine]", 
       "]"}], ";", "\[IndentingNewLine]", "aa"}]}], "\[IndentingNewLine]", 
    "]"}]}], "\[IndentingNewLine]", "\[IndentingNewLine]", 
  "\[IndentingNewLine]", 
  RowBox[{"(*", 
   RowBox[{
    RowBox[{"buildMatrix4", "=", 
     RowBox[{"Compile", "[", 
      RowBox[{
       RowBox[{"{", 
        RowBox[{
         RowBox[{"{", 
          RowBox[{"nRows", ",", "_Integer"}], "}"}], ",", 
         RowBox[{"{", 
          RowBox[{"nCols", ",", "_Integer"}], "}"}], ",", 
         RowBox[{"{", 
          RowBox[{"rulNum", ",", "_Integer"}], "}"}]}], "}"}], ",", 
       RowBox[{"buildMatrix3", "[", 
        RowBox[{"nRows_", ",", "nCols_", ",", "rulNum_"}], "]"}]}], "]"}]}], 
    ";"}], "*)"}], "\[IndentingNewLine]", "\n", 
  RowBox[{"(*", 
   RowBox[{
    RowBox[{"FrontEndExecute", "[", 
     RowBox[{"FrontEndToken", "[", "\"\<DeleteGeneratedCells\>\"", "]"}], 
     "]"}], ";"}], "*)"}]}], "\n", 
 RowBox[{
  RowBox[{"Manipulate", "[", "\[IndentingNewLine]", 
   RowBox[{
    RowBox[{"showMatrix", "[", 
     RowBox[{
      RowBox[{"buildMatrix2", "[", 
       RowBox[{
        RowBox[{"Quotient", "[", 
         RowBox[{"cols", ",", "2"}], "]"}], ",", "cols", ",", "ruleNumber"}], 
       " ", "]"}], ",", "600"}], "]"}], "\[IndentingNewLine]", ",", 
    RowBox[{"{", 
     RowBox[{
      RowBox[{"{", 
       RowBox[{"ruleNumber", ",", "90", ",", "\"\<Rule N\>\""}], "}"}], ",", 
      "0", ",", "255", ",", "1"}], "}"}], ",", 
    RowBox[{"{", 
     RowBox[{
      RowBox[{"{", 
       RowBox[{"cols", ",", "100"}], "}"}], ",", "1", ",", "500", ",", "10"}],
      "}"}]}], "\[IndentingNewLine]", "]"}], "\[IndentingNewLine]", 
  "\[IndentingNewLine]", 
  "\[IndentingNewLine]"}], "\[IndentingNewLine]"}], "Input",
 CellChangeTimes->{{3.680442813436995*^9, 3.680442848874536*^9}, {
   3.6804430777951117`*^9, 3.680443078850544*^9}, 3.680454523856257*^9, 
   3.68045458485107*^9, {3.680455520917263*^9, 3.680455545465087*^9}, {
   3.6804556546787024`*^9, 3.680455655252411*^9}, {3.680456145594637*^9, 
   3.680456181991354*^9}, 3.680456218597145*^9, {3.680456264781082*^9, 
   3.680456306239559*^9}, {3.6804563952399673`*^9, 3.680456421552672*^9}, {
   3.680456512912945*^9, 3.680456515406918*^9}, 3.68045744501854*^9, {
   3.680458554361786*^9, 3.680458687437985*^9}, 3.6804587954183826`*^9, {
   3.6804588827254868`*^9, 3.680458885257924*^9}, {3.680459479145162*^9, 
   3.680459479535612*^9}, {3.680462229599152*^9, 3.680462246972866*^9}, {
   3.680462507433228*^9, 3.680462509464679*^9}, {3.680462567265431*^9, 
   3.6804625812947063`*^9}, {3.6804627072663517`*^9, 
   3.6804627873992167`*^9}, {3.6804628275668707`*^9, 3.680462929518985*^9}, {
   3.6804631173444033`*^9, 3.6804631209824963`*^9}, {3.680463420984755*^9, 
   3.6804634229616528`*^9}, {3.680463502065168*^9, 3.680463502405313*^9}, {
   3.680463598111535*^9, 3.680463608309165*^9}, 3.680463724338951*^9, {
   3.6804639094907007`*^9, 3.6804639097689133`*^9}, {3.680463945164818*^9, 
   3.680463988048476*^9}, {3.680464276165818*^9, 3.680464284681631*^9}, {
   3.6804643982963667`*^9, 3.6804644041105537`*^9}, {3.680465499616843*^9, 
   3.680465523902207*^9}, {3.680465582291779*^9, 3.680465583155706*^9}, {
   3.680465641958477*^9, 3.680465657942012*^9}, {3.680465744786004*^9, 
   3.680465771025856*^9}, {3.680465805058836*^9, 3.6804658286484613`*^9}, {
   3.680465868442478*^9, 3.6804658699687557`*^9}, {3.680465942121509*^9, 
   3.680465972757299*^9}, {3.680466123776634*^9, 3.680466127831132*^9}, {
   3.6804661701680117`*^9, 3.68046621920429*^9}, {3.6804673541046543`*^9, 
   3.6804673591117687`*^9}, {3.6804674803559933`*^9, 3.680467490005568*^9}, {
   3.680467590129368*^9, 3.680467675395705*^9}, {3.68046771330271*^9, 
   3.680467715166201*^9}, {3.680467763860461*^9, 3.6804677695963707`*^9}, {
   3.680467800693993*^9, 3.680467831862177*^9}, {3.680467937020208*^9, 
   3.68046797593561*^9}, {3.6804680137291327`*^9, 3.680468019279276*^9}, 
   3.6804680519926233`*^9, {3.6804681029272738`*^9, 3.680468167145049*^9}, {
   3.680468199861738*^9, 3.680468273507802*^9}, {3.68046831581699*^9, 
   3.6804683227860193`*^9}, {3.6804683573672533`*^9, 
   3.6804683976102877`*^9}, {3.680468464013174*^9, 3.680468542854019*^9}, {
   3.680472060885458*^9, 3.680472108071663*^9}, 3.6804721516954*^9, {
   3.680472251899041*^9, 3.6804723513252153`*^9}, {3.6804724075304127`*^9, 
   3.680472454867943*^9}, {3.68047258686425*^9, 3.680472597797195*^9}, {
   3.680472645633751*^9, 3.6804726495765057`*^9}, {3.6804726835853577`*^9, 
   3.680472751839364*^9}, {3.680472814849338*^9, 3.680472855394279*^9}, {
   3.680472907712927*^9, 3.680472908610654*^9}, {3.6804729570238447`*^9, 
   3.680473029934029*^9}, {3.680473086165454*^9, 3.680473109908983*^9}, {
   3.680473150289426*^9, 3.6804731694811697`*^9}, {3.6804732120601187`*^9, 
   3.680473249090357*^9}, {3.6804733089572268`*^9, 3.6804733279509907`*^9}, {
   3.680473360327201*^9, 3.6804734738980017`*^9}, {3.68047351646255*^9, 
   3.6804735286771717`*^9}, {3.680473559369751*^9, 3.680473596101944*^9}, {
   3.680473627000278*^9, 3.680473691548293*^9}, {3.680473730326783*^9, 
   3.680473811380171*^9}, {3.6804739273677483`*^9, 3.680474050139936*^9}, {
   3.680474492364593*^9, 3.680474667351568*^9}, {3.680474739082837*^9, 
   3.6804748137544203`*^9}, {3.6804748819250507`*^9, 3.680474883115081*^9}, {
   3.6804749183090467`*^9, 3.680474968761627*^9}, {3.680475046371365*^9, 
   3.6804750469939117`*^9}, {3.680475120365737*^9, 3.6804751221401663`*^9}, {
   3.680475169366088*^9, 3.68047518918813*^9}, {3.680475224399395*^9, 
   3.680475224893223*^9}, {3.680475282436849*^9, 3.680475284674988*^9}, {
   3.6804753306601467`*^9, 3.680475382782763*^9}, {3.6804754171050587`*^9, 
   3.68047542793543*^9}, {3.680475459600482*^9, 3.680475465526194*^9}, {
   3.680475558010614*^9, 3.680475563928385*^9}, {3.680475631152462*^9, 
   3.680475705233289*^9}, {3.68047576596446*^9, 3.680475790786408*^9}, {
   3.680475855371883*^9, 3.680475877239757*^9}, {3.680475911588867*^9, 
   3.680475913043407*^9}, 3.680475999283279*^9, {3.680476181211575*^9, 
   3.680476201813801*^9}, {3.6804762364543743`*^9, 3.6804763137548933`*^9}, {
   3.680476428897571*^9, 3.680476469641115*^9}, {3.680476510372354*^9, 
   3.6804766074062157`*^9}, {3.680476689109227*^9, 3.680476731329651*^9}, {
   3.680476881510098*^9, 3.680476952656321*^9}, {3.680477005101005*^9, 
   3.680477034950879*^9}, {3.6804770703039513`*^9, 3.680477071262188*^9}, {
   3.680477108473157*^9, 3.680477165761994*^9}, {3.6804772393545713`*^9, 
   3.680477403275845*^9}, {3.6804774459421253`*^9, 3.680477476180015*^9}, {
   3.680477692663692*^9, 3.680477774152629*^9}, {3.6804778550789137`*^9, 
   3.6804779051736307`*^9}, {3.680477938014353*^9, 3.6804779828736963`*^9}, {
   3.680478031068225*^9, 3.680478031346424*^9}, {3.680478084489396*^9, 
   3.6804781148342876`*^9}, {3.680478149327609*^9, 3.680478182416596*^9}, {
   3.680478212656337*^9, 3.680478214879282*^9}, {3.6804782734142714`*^9, 
   3.680478399105192*^9}, {3.680478429591537*^9, 3.680478457304719*^9}, {
   3.680478496905409*^9, 3.680478503930648*^9}, {3.6804785524904547`*^9, 
   3.680478570014513*^9}, {3.680478601655476*^9, 3.6804786223839483`*^9}, {
   3.680478662526538*^9, 3.680478705450082*^9}, {3.6804787495525637`*^9, 
   3.680478806986088*^9}, 3.680479295426591*^9, {3.6804793514616117`*^9, 
   3.680479539217215*^9}, {3.680479681320459*^9, 3.680479738228026*^9}, {
   3.680479932252091*^9, 3.6804800998324423`*^9}, {3.680480136351076*^9, 
   3.6804801652702436`*^9}, {3.6804802580927687`*^9, 3.680480425952222*^9}, {
   3.6804804666891823`*^9, 3.680480512210174*^9}, {3.680480557980586*^9, 
   3.680480579520337*^9}, {3.680480672980152*^9, 3.680480764004654*^9}, 
   3.680480806117853*^9, {3.680480890083192*^9, 3.680480899752267*^9}, {
   3.6804809317056227`*^9, 3.680481029246655*^9}, {3.6804810626158323`*^9, 
   3.680481084580847*^9}, {3.680481242636723*^9, 3.6804812986089983`*^9}, {
   3.680481447226412*^9, 3.680481472874658*^9}}],

Cell[BoxData[
 TagBox[
  StyleBox[
   DynamicModuleBox[{$CellContext`cols$$ = 391, $CellContext`ruleNumber$$ = 
    157, Typeset`show$$ = True, Typeset`bookmarkList$$ = {}, 
    Typeset`bookmarkMode$$ = "Menu", Typeset`animator$$, Typeset`animvar$$ = 
    1, Typeset`name$$ = "\"untitled\"", Typeset`specs$$ = {{{
       Hold[$CellContext`ruleNumber$$], 90, "Rule N"}, 0, 255, 1}, {{
       Hold[$CellContext`cols$$], 100}, 1, 500, 10}}, Typeset`size$$ = {
    419., {3.0548095703125, 11.}}, Typeset`update$$ = 0, Typeset`initDone$$, 
    Typeset`skipInitDone$$ = True, $CellContext`ruleNumber$29461$$ = 
    0, $CellContext`cols$29462$$ = 0}, 
    DynamicBox[Manipulate`ManipulateBoxes[
     1, StandardForm, 
      "Variables" :> {$CellContext`cols$$ = 100, $CellContext`ruleNumber$$ = 
        90}, "ControllerVariables" :> {
        Hold[$CellContext`ruleNumber$$, $CellContext`ruleNumber$29461$$, 0], 
        Hold[$CellContext`cols$$, $CellContext`cols$29462$$, 0]}, 
      "OtherVariables" :> {
       Typeset`show$$, Typeset`bookmarkList$$, Typeset`bookmarkMode$$, 
        Typeset`animator$$, Typeset`animvar$$, Typeset`name$$, 
        Typeset`specs$$, Typeset`size$$, Typeset`update$$, Typeset`initDone$$,
         Typeset`skipInitDone$$}, "Body" :> $CellContext`showMatrix[
        $CellContext`buildMatrix2[
         Quotient[$CellContext`cols$$, 
          2], $CellContext`cols$$, $CellContext`ruleNumber$$], 600], 
      "Specifications" :> {{{$CellContext`ruleNumber$$, 90, "Rule N"}, 0, 255,
          1}, {{$CellContext`cols$$, 100}, 1, 500, 10}}, "Options" :> {}, 
      "DefaultOptions" :> {}],
     ImageSizeCache->{474., {77., 84.}},
     SingleEvaluation->True],
    Deinitialization:>None,
    DynamicModuleValues:>{},
    SynchronousInitialization->True,
    UnsavedVariables:>{Typeset`initDone$$},
    UntrackedVariables:>{Typeset`size$$}], "Manipulate",
   Deployed->True,
   StripOnInput->False],
  Manipulate`InterpretManipulate[1]]], "Output",
 CellChangeTimes->{
  3.680480513699798*^9, {3.680480560060671*^9, 3.680480567857848*^9}, 
   3.680480719387274*^9, 3.680480769703642*^9, 3.68048080833848*^9, 
   3.680481030575789*^9, 3.6804810857944727`*^9, {3.6804812777268867`*^9, 
   3.680481302126882*^9}, 3.680481474185527*^9}]
}, Open  ]]
}, Open  ]]
},
WindowSize->{1336, 778},
WindowMargins->{{23, Automatic}, {Automatic, 7}},
Magnification:>1.25 Inherited,
FrontEndVersion->"10.0 for Mac OS X x86 (32-bit, 64-bit Kernel) (June 27, \
2014)",
StyleDefinitions->Notebook[{
   Cell[
    StyleData[StyleDefinitions -> "Default.nb"]], 
   Cell[
    StyleData["Title"]]}, Visible -> False, FrontEndVersion -> 
  "10.0 for Mac OS X x86 (32-bit, 64-bit Kernel) (June 27, 2014)", 
  StyleDefinitions -> "PrivateStylesheetFormatting.nb"]
]
(* End of Notebook Content *)

(* Internal cache information *)
(*CellTagsOutline
CellTagsIndex->{}
*)
(*CellTagsIndex
CellTagsIndex->{}
*)
(*NotebookFileOutline
Notebook[{
Cell[CellGroupData[{
Cell[1486, 35, 159, 2, 62, "Chapter"],
Cell[1648, 39, 242, 6, 353, "Text"],
Cell[1893, 47, 166, 3, 68, "Text"],
Cell[2062, 52, 116, 1, 37, "Text"],
Cell[2181, 55, 549, 17, 87, "Text"],
Cell[CellGroupData[{
Cell[2755, 76, 16145, 344, 1170, "Input"],
Cell[18903, 422, 2258, 43, 181, "Output"]
}, Open  ]]
}, Open  ]]
}
]
*)

(* End of internal cache information *)

(* NotebookSignature fxpDwFx@qRKqdBKi4NF3L5iJ *)
