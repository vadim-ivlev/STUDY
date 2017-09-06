	house_elf(dobby). 
	witch(hermione). 
	witch('McGonagall'). 
	witch(rita_skeeter). 
	magic(X):-  house_elf(X). 
	magic(X):-  wizard(X). 
	magic(X):-  witch(X).

word(determiner,a). 
   word(determiner,every). 
   word(noun,criminal). 
   word(noun,'big  kahuna  burger'). 
   word(verb,eats). 
   word(verb,likes). 
    
   sentence(Word1,Word2,Word3,Word4,Word5):- 
         word(determiner,Word1), 
         word(noun,Word2), 
         word(verb,Word3), 
         word(determiner,Word4), 
         word(noun,Word5).


% word(astante,  a,s,t,a,n,t,e). 
%word(astoria,  a,s,t,o,r,i,a). 
%word(baratto,  b,a,r,a,t,t,o). 
%word(cobalto,  c,o,b,a,l,t,o). 
%word(pistola,  p,i,s,t,o,l,a). 
%word(statale,  s,t,a,t,a,l,e).

word(abalone, a,b,a,l,o,n,e).
word(abandon, a,b,a,n,d,o,n).
word(enhance, e,n,h,a,n,c,e).
word(anagram, a,n,a,g,r,a,m).
word(connect, c,o,n,n,e,c,t).
word(elegant, e,l,e,g,a,n,t).


crossword(V1,V2,V3,H1,H2,H3):-

	word(H1,_,X1,_,X2,_,X3,_),
	word(H2,_,X4,_,X5,_,X6,_),
	word(H3,_,X7,_,X8,_,X9,_),

	word(V1,_,X1,_,X4,_,X7,_),
	word(V2,_,X2,_,X5,_,X8,_),
	word(V3,_,X3,_,X6,_,X9,_).

w(W):-write(W),write(' ').
ww(Q,W,E,R,T,Y):-w(Q),w(W),w(E),w(R),w(T),w(Y),w('.').


go:-crossword(A,B,C,D,E,F),ww(A,B,C,D,E,F),go.
