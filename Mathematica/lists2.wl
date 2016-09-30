(* ::Package:: *)

(* ::Subsubsection:: *)
(*6. *)


(* ::Text:: *)
(*There lists S and P of the same length n.P is a permutation of Range[n].Compute the list T : \[ForAll] k \[Element] P \[Implies] T[[k]] = S[[P[[k]]]]*)
(**)
(*For example : S = {a, b, c, d}, P = {3, 2, 4, 1} \[Implies] T = {c, b, d, a}*)


(* ::Input:: *)
(*ClearAll[a,b,c,d,fun]*)
(*p=RandomSample[Range[4],4];*)
(*s={a,b,c,d};p={3,2,4,1};*)
(*funT[s_,p_]:=Table[s[[p[[k]]]],{k,Length[s]}]*)
(*c*)


(* ::Subsubsection::Closed:: *)
(*7. *)


(* ::Text:: *)
(*Compute U : \[ForAll] k \[Element] {1,2,3,4} \[Implies] U[[P[[k]]]]=S[[k]].*)
(*For example:*)
(*S={a,b,c,d}, P={3,2,4,1} \[Implies] U={d,b,a,c}*)


(* ::Input:: *)
(*funU[s_,p_]:=Module[{u},*)
(*u=Table[0, Length@ s];*)
(*Table[u[[p[[k]]]]=s[[k]],{k,1,Length@ s}];*)
(*u*)
(*]*)
(*{s,p,funU[s,p]}*)
(**)


(* ::Text:: *)
(**)
(**)
(*8. How do you perform the same action as Prepend[{x,y},z] using Join function?*)


(* ::Input:: *)
(*Prepend[{x,y},z] ==Join[{z},{x,y}]*)


(* ::Subsubsection::Closed:: *)
(*9. *)


(* ::Text:: *)
(*Starting with the list {1,2,3,4} and {a,b,c,d}, Create the list {2,4,b,d}.*)
(*{1,2,3,4} , {a,b,c,d} -> {2,4,b,d}*)


(* ::Input:: *)
(*ClearAll[aa,bb]*)
(*aa=Range[10]*)
(*codeA=ToCharacterCode["a"][[1]];*)
(*bb =CharacterRange[codeA,codeA+9]*)
(*evens=Table[i,{i,2,10,2}];*)
(*Join[aa[[evens]],bb[[evens]]]*)


(* ::Subsubsection::Closed:: *)
(*10*)


(* ::Text:: *)
(*10. Starting with the list {1,2,3,4} and {a,b,c,d}, Create the list {2,4,b,d}.*)
(*{1,2,3,4} , {a,b,c,d} -> {2,4,b,d}*)
(**)


(* ::Input:: *)
(*ClearAll[aa,bb]*)
(*aa=Range[10]*)
(*codeA=ToCharacterCode["a"][[1]];*)
(*bb =CharacterRange[codeA,codeA+9]*)
(*Flatten@Transpose[{aa,bb}]*)


(* ::Subsubsection:: *)
(*11*)


(* ::Text:: *)
(*Given two lists, find all those elements that are not common to the two lists. *)


(* ::Input:: *)
(*ClearAll[a,b]*)
(*a=Range[1,10]*)
(*b= Range[5,14]*)
(*Complement[a\[Union]b,a\[Intersection] b]*)


(* ::Subsubsection:: *)
(*12*)


(* ::Text:: *)
(*One of the tasks in computational linguistics involves statistical analysis of text using what are called n-grams. These are sequences of n adjacent letters or wordss and their frequency distribution in a body of text can be used to predict word usage based on the previous history or usage. Import a file consisting of some text and find the twenty most frequently occurring word combinations. Pairs of words that are grouped like this are called bigrams, that is, n-grams for n = 2.*)
(**)


(* ::Input::Initialization:: *)
ClearAll[load,analyze]

load[path_]:=Module[{s,t},
Print["Loading '",path];
t=Timing[ s=Import[path,"Plaintext"]];
Print["Load time = ",t[[1]],", Text size = ", StringLength@ s];s
]


analyze[s_]:=Module[{t,bb,nGrams,count},

nGrams[ss_,n_]:=Partition[StringSplit[ss,RegularExpression["\\W+"]] ,n,1];

count[a_]:=Module[{u,c,uu,incUU,cc},
uu=<||>;
incUU[b_]:=uu[[Key[b]]] =Lookup[uu,Key[b],0]+1;
Map[incUU,a];
KeySortBy[uu,(-uu[[Key[#]]])&]
];

t=Timing[bb=count@ nGrams[#,2]& @  s];

Print["Analysis time = ",t[[1]]];
Print["Number of 2-grams = ",Length@ bb];
Print [TableForm @ Normal@ bb[[1;;Min[20,Length@ bb]]] ];
]

(* analyze @ "hello there and me hello there and here for" *)



(* Short 170K *)
analyze@ load@ "http://www.gutenberg.org/cache/epub/2781/pg2781.txt";


(* ::Input:: *)
(*(* Long 3M *)*)
(*analyze@ load@ "https://www.gutenberg.org/files/2600/2600-0.txt"*)


(* ::Input:: *)
(**)
