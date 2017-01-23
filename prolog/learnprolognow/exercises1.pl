% Exercise  1.3 How many facts, rules, clauses, 
% and predicates are there in the following knowledge base? 
% What are the heads of the rules, 
% and what are the goals they contain?



% facts
%   woman(vincent). 
%   woman(mia). 
%   man(jules).
% 
% rules
%   person(X):-  man(X);  woman(X). 
%   loves(X,Y):-  father(X,Y). 
%   father(Y,Z):-  man(Y),  son(Z,Y). 
%   father(Y,Z):-  man(Y),  daughter(Z,Y).
% 
%   head  :- goal1, goal2
% 
% 7 clauses
% 
% 5 predicates
% 
%   woman/1
%   man/1
%   person/1
%   loves/2
%   father/2


% Exercise  1.4 Represent the following in Prolog:
% 
% Butch is a killer.
% Mia and Marsellus are married.
% Zed is dead.
% Marsellus kills everyone who gives Mia a footmassage.
% Mia loves everyone who is a good dancer.
% Jules eats anything that is nutritious or tasty.


% Exercise  1.5 Suppose we are working with the 
% following knowledge base:

wizard(ron). 
hasWand(harry). 
quidditchPlayer(harry). 
wizard(X):-  hasBroom(X),  hasWand(X). 
hasBroom(X):-  quidditchPlayer(X).


% How does Prolog respond to the following queries?

% wizard(ron).
% witch(ron).
% wizard(hermione).
% witch(hermione).
% wizard(harry).
% wizard(Y).
% witch(Y).

