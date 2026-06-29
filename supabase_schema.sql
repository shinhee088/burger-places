create table if not exists burgers (
  id bigint generated always as identity primary key,
  rank integer not null,
  name text not null,
  menu text not null,
  rating numeric(2,1) not null,
  price integer not null,
  description text not null,
  location text not null,
  created_at timestamptz not null default now()
);

alter table burgers enable row level security;

create policy "public read" on burgers for select using (true);
create policy "public insert" on burgers for insert with check (true);
create policy "public update" on burgers for update using (true);
create policy "public delete" on burgers for delete using (true);

insert into burgers (rank, name, menu, rating, price, description, location) values
(1, '다운타우너 한남', '아보카도 버거', 4.7, 12800, '아보카도와 패티 조합이 인기인 대표 메뉴', '서울 용산구 이태원로42길 28'),
(2, '브루클린 더 버거 조인트', '치즈버거', 4.6, 11500, '두툼한 패티와 클래식한 치즈버거 맛집', '서울 서초구 서래로2길 27'),
(3, '길버트버거앤프라이즈', '길버트 버거', 4.5, 13000, '수제 패티와 감자튀김 조합이 좋은 버거', '서울 강남구 도산대로15길 47'),
(4, '버거파크', '베이컨 치즈버거', 4.5, 10900, '가성비 좋은 수제버거로 알려진 매장', '서울 종로구 대학로11길 5'),
(5, '패티앤베지스', '클래식 버거', 4.4, 12500, '패티와 채소 밸런스가 좋은 수제버거', '서울 강남구 압구정로46길 75'),
(6, '아이엠어버거', '더블치즈버거', 4.4, 12000, '두툼한 패티와 진한 치즈맛이 특징', '서울 마포구 와우산로30길 13'),
(7, '슈퍼두퍼 강남', '슈퍼 싱글 버거', 4.3, 10900, '미국식 스타일의 캐주얼 버거', '서울 서초구 강남대로 463'),
(8, '바스버거', '바스버거', 4.3, 9800, '기본에 충실한 수제버거와 감자칩 제공', '서울 중구 다동길 5'),
(9, '버거보이 성수', '치즈버거', 4.2, 9500, '성수동에서 가볍게 먹기 좋은 버거', '서울 성동구 연무장길 39-26'),
(10, '노스트레스버거', '클래식 치즈버거', 4.2, 10000, '깔끔한 구성의 치즈버거 맛집', '서울 용산구 신흥로 62');
