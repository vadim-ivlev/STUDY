aaa := analyze[load["http://www.gutenberg.org/cache/epub/2781/pg2781.txt"]]
 
analyze[s_] := Module[{t, bb, nGrams, count}, 
     nGrams[ss_, n_] := Partition[StringSplit[ss, RegularExpression["\\W+"]], 
        n, 1]; count[a_] := Module[{u, c, uu, incUU, cc}, 
        uu = Association[]; incUU[b_] := uu[[Key[b]]] = 
           Lookup[uu, Key[b], 0] + 1; incUU /@ a; KeySortBy[uu, 
          -uu[[Key[#1]]] & ]]; t = Timing[bb = (count[nGrams[#1, 2]] & )[s]]; 
      Print["Analysis time = ", t[[1]]]; Print["Number of 2-grams = ", 
       Length[bb]]; Print[TableForm[Normal[
         bb[[1 ;; Min[20, Length[bb]]]]]]]; ]
 
load[path_] := Module[{s, t}, Print["Loading '", path]; 
      t = Timing[s = Import[path, "Plaintext"]]; Print["Load time = ", 
       t[[1]], ", Text size = ", StringLength[s]]; s]
