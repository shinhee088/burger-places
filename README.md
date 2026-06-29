# 서울 수제버거 맛집 TOP 10 기록장

Vite + React + Supabase로 만든 CRUD 웹앱입니다.

## 1. Supabase 설정

1. https://supabase.com 에서 프로젝트 생성
2. 좌측 메뉴 **SQL Editor** 에서 `supabase_schema.sql` 내용을 그대로 실행
   - `burgers` 테이블 생성 + RLS 정책(공개 read/insert/update/delete) + 샘플 10개 데이터 삽입
3. 좌측 메뉴 **Project Settings → API** 에서 아래 두 값을 복사
   - `Project URL`
   - `anon public` key

## 2. 로컬 환경변수 설정

프로젝트 루트에 `.env` 파일을 만들고 (`.env.example` 참고):

```
VITE_SUPABASE_URL=복사한 Project URL
VITE_SUPABASE_ANON_KEY=복사한 anon key
```

## 3. 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 4. Vercel 배포

1. GitHub에 이 프로젝트 push
2. Vercel에서 New Project → 해당 repo import
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Project Settings → Environment Variables** 에서 아래 두 개 추가
   - `VITE_SUPABASE_URL` = Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = Supabase anon key
4. Deploy 클릭

배포 후에도 동일한 Supabase 테이블을 보기 때문에, 새로고침/재배포해도 데이터는 그대로 유지됩니다.

## 폴더 구조

```
src/
  App.jsx           메인 로직 (조회/추가/수정/삭제)
  BurgerForm.jsx     입력 폼 (추가/수정 공용)
  BurgerCard.jsx     카드 한 개 UI
  supabaseClient.js  Supabase 클라이언트 초기화
  index.css          전체 스타일
supabase_schema.sql  테이블 생성 + 샘플 데이터 SQL
```
