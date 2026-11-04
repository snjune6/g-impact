# G-IMPACT 에너지 에디션

에너지 기업용 비즈니스 코칭 소개 페이지입니다. 피그마의 **에너지에디션** 첫 페이지를 정적 HTML로 옮겼고, Firebase Hosting 기본 사이트에 배포되어 있습니다.

## 배포 주소

| 항목 | 값 |
| --- | --- |
| 라이브 사이트 | https://g-impact-dfe3b.web.app |
| Firebase 앱 도메인 | https://g-impact-dfe3b.firebaseapp.com |
| Firebase 프로젝트 | `g-impact-dfe3b` |
| Hosting 사이트 | `g-impact-dfe3b` (프로젝트 기본 사이트) |
| 콘솔 | https://console.firebase.google.com/project/g-impact-dfe3b/hosting/sites |

같은 프로젝트의 추가 사이트 `g-impact`(`https://g-impact.web.app`)는 호스팅이 중지된 상태입니다. 이 저장소의 배포 대상은 기본 사이트뿐입니다.

## 디자인 원본

| 항목 | 값 |
| --- | --- |
| 파일 | [지임팩트](https://www.figma.com/design/SXF2jlptTMFndChPmKXQZV/%EC%A7%80%EC%9E%84%ED%8C%A9%ED%8A%B8?node-id=1-25) |
| 파일 키 | `SXF2jlptTMFndChPmKXQZV` |
| 페이지 | 에너지에디션 (`1:25`) |
| 프레임 | 에너지에디션 (`1:26`), 1920 × 8387 |
| 구현 범위 | 이 페이지 한 장. 파일의 다른 페이지는 포함하지 않음 |

화면은 Figma MCP의 디자인 컨텍스트와 스크린샷을 기준으로 만들었습니다. 로고, 히어로, 노트북, 디바이스, 다이어그램, 아이콘은 피그마 에셋을 `public/assets`에 받아 사용합니다. 글꼴은 [Pretendard](https://github.com/orioncactus/pretendard) CDN입니다.

## 페이지 구성

1. 헤더: 로고, 지임팩트 소개, 비지니스 코칭, 문의하기
2. 히어로: 에너지 에디션 소개와 상담 신청
3. 문제 제기: 설명, 지원사업, 자금조달, ESG 보고
4. 산업 맥락, 사업화·자금조달, 성과·ESG 보고
5. Growth 상품: BM 코칭, 전략 코칭, 동행 코칭
6. Growth 진행 단계와 포함 범위
7. Impact 과정: 소셜브랜드 코칭, ESG 코칭
8. 실증 실적: 54곳, 870건
9. 기업코칭사례

메뉴와 버튼은 같은 페이지의 해당 섹션으로 이동합니다. 상품 카드의 화살표는 가로 목록을 스크롤합니다.

## 디렉터리

```
public/
  index.html          페이지 마크업
  styles.css          스타일
  assets/             피그마에서 받은 이미지와 SVG
firebase.json         Hosting 공개 디렉터리와 사이트 설정
.firebaserc           기본 Firebase 프로젝트
```

Firebase CLI가 만드는 `.firebase/` 캐시와 로컬 Cursor 설정은 저장소에 포함하지 않습니다.

## 로컬에서 보기

`public`이 정적 파일의 루트입니다.

```powershell
cd public
python -m http.server 5500
```

브라우저에서 http://localhost:5500 을 엽니다.

## 다시 배포

Firebase CLI에 `g-impact-dfe3b` 프로젝트 권한이 있는 계정으로 로그인되어 있어야 합니다.

```powershell
firebase deploy --only hosting --project g-impact-dfe3b
```

`firebase.json`의 Hosting 사이트 이름이 `g-impact-dfe3b`이므로, 이 명령은 기본 사이트만 갱신합니다. 배포가 끝나면 https://g-impact-dfe3b.web.app 에 반영됩니다.
