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
