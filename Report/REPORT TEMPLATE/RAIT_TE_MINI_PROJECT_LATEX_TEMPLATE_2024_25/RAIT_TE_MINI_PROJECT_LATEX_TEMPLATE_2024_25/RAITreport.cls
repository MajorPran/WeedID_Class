% iitbthesis.cls
% LaTeX Style file for the Indian Institute of Bombay Thesis Format
%   by Amey Karkare 2007/06/20
%   according to the guidelines given on the webpage 
%   http://gymkhana.iitb.ac.in/~rsf/old/formatthesis.htm
%
% Many commands copied from withesis.cls from 
% http://www.ctan.org/tex-archive/macros/latex/contrib/withesis/
%
% Revisions:
% 18/09/2007: Support for  ``External Guide'' added.
%             The changes submitted by: Anil Nair <talk2anil [AT] gmail.com> 
%=============================================================================
% Licensed under the Perl Artistic License.
% see: http://www.ctan.org/tex-archive/help/Catalogue/licenses.artistic.html
% for more info...
%=============================================================================
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{iitbthesis}[2007/06/25 IIT Bombay Thesis Format]
\typeout{Document Class `RAITreport' v0.95beta <18 Sept 07>}


%=============================================================================
% TBD: We need options to switch between Annual Progress Report,
%      Presynopsis, Synopsis and final thesis, and between different
%      types of reports. 
%=============================================================================
%\DeclareOption{aps}{}
%\DeclareOption{presynopsis}{}
%\DeclareOption{synopsis}{}
%\DeclareOption{thesis}{}
%\DeclareOption{dissertation}{}
%\DeclareOption{project}{}

%=============================================================================
% Pass the options to report class
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{report}}

% Defaults ...
\ProcessOptions

%=============================================================================
% a4paper: thesis must be printed on a4 size paper. 
% 12pt:    font size must be 12 pt
%
% As iitbthesis class is a simple extension of report class, we simply
% pass default options to report class.
% =============================================================================
\PassOptionsToClass{12pt,a4paper}{report}
\LoadClass{report}

% who is advisor?
\def\@advisorname{None}
\newcommand{\setguide}[1]{\def\@advisorname{#1}}

\def\@projectcoordinatorname{None}
\newcommand{\setprojectcoordinatorname}[1]{\def\@projectcoordinatorname{#1}}

% and coadvisor? (initialized to empty)
\global\let\@coadvisorname\@empty
\newcommand{\setcoguide}[1]{\def\@coadvisorname{#1}}
\let\coguide\setcoguide %
\newcommand{\show@coguide}{\@coadvisorname}

% and exadvisor? (initialized to empty)
\global\let\@exadvisorname\@empty
\newcommand{\setexguide}[1]{\def\@exadvisorname{#1}}
\let\exguide\setexguide %
\newcommand{\show@exguide}{\@exadvisorname}

%=============================================================================
% TITLE PAGE
%   - define \title{} \author{} \date{}
%   - The default degree is ``Unknown Degree''
%     Degree can be changed using the command \iitbdegree{}
%   - The default department is ``Unknown Department''
%     The department can be changed using the command \department{}
%   - The default document type is ``A preliminary report''
%     The document type can be changed using the command \reporttype{}
%     There are some short-cuts for \reporttype{}:
%      * for a PhD thesis, specify \thesis
%      * for a M.Tech./M.Phil./M.Des./M.S. dissertation, specify \dissertation
%      * for a DIIT/B.Tech./M.Sc.project report, specify \project
%      * for a preliminary report, specify \prelim
%   - once the above are defined, use \maketitle to generate the titlepage
%=============================================================================
\newcommand\@thesistitlemedskip{0.25in}
\newcommand\@thesistitlebigskip{0.6in}
\newcommand{\rollnum}[1]{\gdef\@rollnum{#1}}
\newcommand{\iitbdegree}[1]{\gdef\@iitbdegree{#1}}
\newcommand{\department}[1]{\gdef\@department{#1}}
\newcommand{\reporttype}[1]{\gdef\@doctype{#1}}
\newcommand{\approvaltype}[1]{\gdef\@approvaltype{#1}}

\newcommand{\thesis}{\reporttype{thesis}\approvaltype{Thesis}}
\newcommand{\dissertation}{\reporttype{dissertation}\approvaltype{Dissertation}}
\newcommand{\project}{\reporttype{project report}\approvaltype{Report}}
\newcommand{\prelim}{\reporttype{preliminary report}\approvaltype{Report}}

\gdef\@rollnum{Unknown 00000000}    % Default is Unknown 00000000
\gdef\@iitbdegree{Unknown Degree}    % Default is Unknown Degree
\gdef\@doctype{preliminary report}  % Default is a preliminary report
\gdef\@department{(Unknown Department)} % Default is Unknown

\renewcommand{\maketitle}{%
  \begin{titlepage}
%-----------------------------------------------------------------------------
% -- The thesis office doesn't like thanks on title page.  Put it in
% -- the acknowledgments.  This is here so you don't have to change
% -- your titlepage when converting from report style. -> from Purdue, but I
%        left it here since it seems compatible with UW-Madison, Eric -
%    Amey - I also left it here as IITB does not say anything about it.
%-----------------------------------------------------------------------------
    \def\thanks##1{\typeout{Warning: `thanks' deleted from thesis titlepage.}}
    \let\footnotesize\small \let\footnoterule\relax \setcounter{page}{1}
    \vspace*{0.1in}
    \begin{center}
      \mbox{}\\
			\large %Mini Project-2B Report on \\
      {\bf\expandafter\uppercase\expandafter{\LARGE\@title}} \\[\@thesistitlebigskip]
      %{\large A project report stage I submitted in partial fulfillment of the requirements}\\
      {\large Submitted in the partial fulfillment of the requirements}\\
      {\large  for the degree of B.Tech in Computer Engineering}\\[\@thesistitlemedskip]
      %{\large  (Computer Engineering)}\\[\@thesistitlemedskip]
      %{\large  for the degree of Bachelor of Engineering in Information Technology}\\[\@thesistitlemedskip]
      %{\large \@iitbdegree} \\[\@thesistitlemedskip]
      {\large by} \\[\@thesistitlemedskip]
      {\large \bf \@author} \\
      %{\large \bf (Roll No. \@rollnum)} \\[\@thesistitlebigskip]
      [\@thesistitlemedskip]
      \vspace{0.3in}
      %{\large Under the guidance of }  \\
      {\large Supervisor}  \\
\     \vspace{-0.2in}
      {\large \bf \@advisorname} \\
      \ifx\@coadvisorname\@empty
         \ifx\@exadvisorname\@empty
             \mbox{}\\[\@thesistitlemedskip]
     \else
         {\large and } \\
         {\large \bf \@exadvisorname} \\[\@thesistitlemedskip]
     \fi %
      \else
          \ifx\@exadvisorname\@empty
          {\large and } \\
          {\large \bf \@coadvisorname} \\[\@thesistitlemedskip]
      \else
          {\large \bf \@coadvisorname} \\%[\@thesistitlemedskip]
          {\large and } \\
          {\large \bf \@exadvisorname} \\[\@thesistitlemedskip]
      \fi %
      \fi %
     \includegraphics [width=6cm,height=9cm,keepaspectratio]{rait-dypu-logo.png}  \\[\@thesistitlemedskip]
      {\large \bf \uppercase{\@department}} \\%[\@thesistitlemedskip]
      {\large \bf Ramrao Adik Institute of Technology\\ Sector 7, Nerul, Navi Mumbai\\ (Under the ambit of D. Y. Patil Deemed to be University)}\\%[\@thesistitlemedskip]
      {\large \@date}
    \end{center}
  \end{titlepage}
  \setcounter{footnote}{0}
  \setcounter{page}{1} %title page is NOT counted
}

%=============================================================================
% DEDICATION
%=============================================================================
% The dedication environment must do the following:
% - start a new page
% - center the text vertically
% - include the text in a center environment
%=============================================================================
\def\dedication{
  \newpage
  \thispagestyle{empty}    % No page number
  \setcounter{page}{0}
  % \addtocounter{page}{-1}
  \chapter*{}            % Required for \vfill to work
  \thispagestyle{empty}    % No page number
  \null\vfil
  \begin{center}}
\def\enddedication{\end{center}\par\vfil\newpage}

%=============================================================================
% CERTIFICATE SHEET
% - start a new page. page 
% - center the text vertically
%=============================================================================
\newcommand\@thesisapprovalmedskip{0.2in}
\newcommand\@thesisapprovalbigskip{0.5in}
\newcommand{\certificate}{
  %\setcounter{page}{2}
 \cleardoublepage
  \thispagestyle{empty}
  \begin{center}
	 \begin{center}
    	%\includegraphics[width=48mm, height=22mm,keepaspectratio]{rait-dypu-logo}
        \includegraphics [width=6cm,height=9cm,keepaspectratio]{rait-dypu-logo.png}
    \end{center}
		\vspace{-0.1in}
    {\huge \bf Ramrao Adik Institute of Technology\\  \large \bf (Under the ambit of D. Y. Patil Deemed to be University) \\ \large \bf Dr. D. Y. Patil Vidyanagar, Sector 7, Nerul, Navi Mumbai 400 706 \\ \vspace{0.2in} \LARGE \bf CERTIFICATE}\\[\@thesisapprovalmedskip]
    {\large This is to certify that, the Mini Project-III report entitled}\\
		\vspace{0.1in}%[\@thesisapprovalmedskip]
    {\bf\uppercase{\Large\@title}}\\ %[\@thesisapprovalmedskip]
    {\large is a bonafide work done by}\\ %[\@thesisapprovalmedskip]
    { \large \bf \@author }\\
    \vspace{0.1in} %[\@thesisapprovalmedskip]
    {\large and is submitted in the partial fulfillment of the requirement for the degree of} \\[\@thesisapprovalmedskip]
    {\large \bf B.Tech in Computer Engineering } \\ %\\[\@thesisapprovalbigskip]
    {\large to the}\\%[\@thesisapprovalbigskip]
    {\large \bf D. Y. Patil Deemed to be University } \\ %\\[\@thesisapprovalbigskip]
   % \vspace{0.1in}
		%\includegraphics[width=25mm, height=19mm,keepaspectratio]{rait-dypu-logo}
    
   \vspace{0.5in}
    \begin{tabular}{ccc}
      \noindent\rule{4cm}{0.5pt} & \hspace{2in}\noindent\rule{4cm}{0.5pt} \\
      \small{Supervisor} & \hspace{2in}\small{Project Co-ordinator}\\
   \small{\textbf{(\@advisorname)}}& \hspace{2in}\small{\textbf{(\@projectcoordinatorname)}}\\
   \vspace{0.25cm}
    \end{tabular}
		
\begin{tabular}{ccc}
      \noindent\rule{4cm}{0.5pt} & \hspace{2in}\noindent\rule{4cm}{0.5pt} \\
      \small{Head of Department} & \hspace{2in}\small{Principal}\\
   \small{\textbf{(Dr. Amarsinh V. Vidhate)}}& \hspace{2in}\small{\textbf{(Dr. Mukesh D. Patil)}}\\
   %\vspace{0.2in}
    \end{tabular}

    
     
%change ends    

  \end{center}
  \let\thanks\relax
  \let\maketitle\relax \let\iitbdegree\relax \let\project\relax \let\prelim\relax
  \let\department\relax
  \gdef\@thanks{}\gdef\@iitbdegree{}\gdef\@doctype{}
  \gdef\@department{}
}


%=============================================================================
% APPROVAL SHEET
% - start a new page. page 
% - center the text vertically
%=============================================================================

\newcommand{\makeapproval}{
\cleardoublepage
  \thispagestyle{empty}
  \begin{center}
	\huge Mini Project Report - III Approval
  \end{center}
	
	\vspace{0.5in}

This is to certify that the Mini Project - III entitled \textbf{\textit{`` Project Title "}} is a bonafide work done by \textbf{\textit{Name of Student 1 (Roll No)}}, \textbf{\textit{Name of Student 2 (Roll No)}}, \textbf{\textit{Name of Student 3 (Roll No)}}, and \textbf{\textit{Name of Student 4 (Roll No)}} under the supervision of \textbf{\textit{\@advisorname}}. This Mini Project is approved in the partial fulfillment of the requirement for the degree of \textbf{\textit{B.tech in Computer Engineering}}
%and \textbf{\textit{Dr./Mr./Mrs. Name of the co-supervisor}}. This dissertation has been approved for the award of \textbf{\textit{Bachelor's Degree in Computer Engineering, University of Mumbai}}.

\vspace{1in}

{\centering Internal Examiner :

\hspace{10cm}1. \ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots

\vspace{0.3in}

\hspace{10cm}2. \ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots

\vspace{0.5in}

External Examiners :

\hspace{10cm}1. \ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots

\vspace{0.3in}

\hspace{10cm}2. \ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots\ldots}

\vspace{0.5in}




Date :\hspace{0.2cm}\ldots/\ldots/\ldots\ldots

\vspace{0.2in}

Place :\hspace{0.2cm}\ldots\ldots\ldots\ldots

		
\let\thanks\relax
\let\maketitle\relax \let\iitbdegree\relax \let\project\relax \let\prelim\relax
\let\department\relax
\gdef\@thanks{}\gdef\@iitbdegree{}\gdef\@doctype{}
\gdef\@department{}
}


%=============================================================================
\def\declaration{
  \chapter*{}
  \thispagestyle{empty}
  \setcounter{page}{0}
  \doublespace}
\def\enddeclaration{%
  \vskip 5cm
  \noindent{\large Date: \rule{4cm}{1sp}}
  \vskip 1cm
  \noindent{\@author\rule{1cm}{0pt}}
  }
  







%=============================================================================
% ABSTRACT
%=============================================================================
% The abstract should begin with two single-spaced lines describing
% the author and title in a standard format.  After these lines comes
% the standard abstract.
%=============================================================================
\def\abstract{
  \chapter*{Abstract}
  \addcontentsline{toc}{chapter}{Abstract}
  \relax\markboth{ABSTRACT}{ABSTRACT}}
\def\endabstract{\par\newpage}

%=============================================================================
% COPYRIGHTPAGE
% The copyright must do the following:
% - start a new page with no number
% - place the copyright text centered at the bottom.
%=============================================================================
\def\copyrightpage{
  \newpage
  \thispagestyle{empty}    % No page number
  \setcounter{page}{0}
  % \addtocounter{page}{-1}
  \chapter*{}            % Required for \vfill to work
  \begin{center}
   \vfill
   \copyright\ Copyright by \@author\ \@date\\
   All Rights Reserved
  \end{center}}


%=============================================================================
% GLOSSARY
%=============================================================================
% The glossary environment must do the following:
% - produce the table of contents entry for the glossary
% - start a new page with GLOSSARY centered two inches from the top
%=============================================================================
\def\glossary{
  \chapter*{Glossary}
  \addcontentsline{toc}{chapter}{Glossary}}
\def\endglossary{\par\newpage}


%=============================================================================
% VITA
%=============================================================================
% The vita environment must do the following:
% - produce a separator page with the word vita centered
% - produce the table of contents entry for the vita
% - start a new page with VITA centered two inches from the top
%=============================================================================
\def\vita{
  \chapter*{Vita}
  \addcontentsline{toc}{chapter}{Vita}}
\def\endvita{\par\newpage}

%=============================================================================
% ACKNOWLEDGMENTS
%=============================================================================
% The acknowledgments environment must do the following:
% - start a new page with ACKNOWLEDGMENTS centered two inches from the top
%=============================================================================
\def\acknowledgments{
  \chapter*{Acknowledgments}
  \thispagestyle{empty}
  \doublespace}
\def\endacknowledgments{%
  \vskip 5cm
  \noindent{\large Date: \rule{4cm}{1sp}\hfill\rule{1cm}{0pt}}
  \par\newpage}

%=============================================================================
% \@makecaption{NUMBER}{TEXT} : Macro to make a figure or table caption.
%      NUMBER : Figure or table number--e.g., 'Figure 3.2'
%      TEXT   : The caption text.
%  Macro should be called inside a \parbox of right width, with \normalsize.
%=============================================================================
\long\def\@makecaption#1#2{%
  \vskip\abovecaptionskip
  \sbox\@tempboxa{#1: #2}%
  \ifdim \wd\@tempboxa >\hsize
    \singlespace#1: #2\par
  \else
    \global \@minipagefalse
    \hb@xt@\hsize{\hfil\box\@tempboxa\hfil}%
  \fi
  \vskip\belowcaptionskip}

%=============================================================================
% LIST OF FIGURES; LIST OF TABLES
%  These macros from report.cls have been modified to add entry in the
%  Contents table
%=============================================================================
\renewcommand\listoffigures{%
    \if@twocolumn
      \@restonecoltrue\onecolumn
    \else
      \@restonecolfalse
    \fi
    \chapter*{\listfigurename}%
    \addcontentsline{toc}{chapter}{\listfigurename}%
      \@mkboth{\MakeUppercase\listfigurename}%
              {\MakeUppercase\listfigurename}%
    \@starttoc{lof}%
    \if@restonecol\twocolumn\fi
    }
\renewcommand\listoftables{%
    \if@twocolumn
      \@restonecoltrue\onecolumn
    \else
      \@restonecolfalse
    \fi
    \chapter*{\listtablename}%
    \addcontentsline{toc}{chapter}{\listtablename}%
      \@mkboth{%
          \MakeUppercase\listtablename}%
         {\MakeUppercase\listtablename}%
    \@starttoc{lot}%
    \if@restonecol\twocolumn\fi
    }
%=============================================================================
% These commands can be used in the thesis to switch between single
% and double spacing.  This is needed, for instance, in the abstract.
%=============================================================================
\newcommand{\oneskip}{1.0}
\newcommand{\twoskip}{1.5}
\newcommand{\singlespace}
  {\renewcommand{\baselinestretch}{\oneskip}\Large\normalsize}
\newcommand{\doublespace}
  {\renewcommand{\baselinestretch}{\twoskip}\Large\normalsize}

%=============================================================================
% Finally set the various lengths/margins as required by IITB format
% Check out LaTeX Companion for more details.
%=============================================================================
% Paper height & width (A4 paper) - set by a4paper option to report
%\setlength{\paperheight}{297mm}
%\setlength{\paperwidth}{210mm}
% total text area: height & width
\setlength{\textheight}{245mm}
\setlength{\textwidth}{160mm}

\setlength{\headheight}{3mm}
\setlength{\headsep}{12mm}
\setlength{\topmargin}{15mm}
% left side empty space on odd- & even-numbered pages
\if@twoside
  \typeout{Two side is true}
  \setlength{\oddsidemargin}{30mm}  % for two side printing
  \setlength{\evensidemargin}{20mm}
\else
  \typeout{Two side is false}
  \setlength{\oddsidemargin}{30mm}  % for one side printing
  \setlength{\evensidemargin}{30mm} % odd side margin = even side margin
\fi
\setlength{\hoffset}{-1in} % already accounted for in the margins
\setlength{\voffset}{-1in} % already accounted for in the margins
% line, paragraphs indent & spacing
\setlength{\parindent}{5ex} % indentation 5 characters approx.

\doublespace

%=============================================================================
% END FILE
%=============================================================================
