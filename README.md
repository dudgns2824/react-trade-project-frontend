## 폴더 구조 (클린 아키텍쳐)

```
/src
 ├── /presentation        # UI 및 컴포넌트 계층
 │    ├── /components     # 재사용 가능한 UI 컴포넌트
 │    ├── /pages          # 라우트별 페이지 컴포넌트
 │    ├── /hooks          # UI 관련 커스텀 훅
 │    ├── /routes.tsx     # 라우팅 설정
 │
 ├── /application         # 유스케이스 계층 (비즈니스 로직)
 │    ├── /auth
 │    │    ├── loginUseCase.ts    # 로그인 유스케이스
 │    │    ├── registerUseCase.ts # 회원가입 유스케이스
 │    │    ├── logoutUseCase.ts   # 로그아웃 유스케이스
 │
 ├── /domain              # 도메인 계층 (엔터티 및 인터페이스)
 │    ├── /auth
 │    │    ├── AuthEntity.ts     # 인증 엔터티
 │    │    ├── AuthRepository.ts # 인증 리포지토리 인터페이스
 │
 ├── /infrastructure      # 외부 시스템과의 연결 (API, DB, Storage)
 │    ├── /auth
 │    │    ├── AuthRepositoryImpl.ts # 인증 리포지토리 구현체 (API 호출)
 │    │    ├── AuthAPI.ts           # HTTP API 클라이언트
 │
 ├── /shared              # 공통적으로 사용하는 타입, DTO, Enum
 │    ├── /constants      # 서버 Enum 및 상수 정의
 │    │    ├── AuthRoles.ts        # 사용자 역할 Enum
 │    │    ├── HttpStatus.ts       # HTTP 상태 코드 Enum
 │    │
 │    ├── /dto            # 서버 Request/Response DTO 정의
 │    │    ├── auth
 │    │    │    ├── LoginRequestDTO.ts   # 로그인 요청 DTO
 │    │    │    ├── LoginResponseDTO.ts  # 로그인 응답 DTO
 │    │    │    ├── RegisterRequestDTO.ts # 회원가입 요청 DTO
 │
 ├── /config              # 설정 및 환경 변수
 │    ├── apiClient.ts    # API 설정 (Axios 등)
 │    ├── env.ts          # 환경 변수 설정
 │
 ├── /main.tsx            # 앱 진입점
 ├── /index.tsx           # React 렌더링 설정
```

## 명명 규칙 (파일명)

### 클래스, 인터페이스 명명 규칙
```
기본적으로 ts 앞까지 붙여서 파일 생성 user.entity.ts -> UserEntity      
query-jwt.use-case.ts -> QueryJwtUseCase      
```

### 파일 이름이 두 의미로 띄워서 만들어야 할 경우
```
example) userRole.ts      
 -> user-role.type.ts 중간에 하이픈 넣어서 명명      
database는 한 단어이므로 database.ts      
```

### 포트와 상속받아 사용하는 구현체에는 CQRS 패턴을 적용 권고
```
CQRS(Command Query Responsibility Segregation) 패턴을 적용.      

Command (생성, 수정, 삭제): 상태를 변경하는 로직을 포함      example) command-jwt.use-case.ts
Query (조회, 읽기): 데이터 조회만 담당      example) query-jwt.use-case.ts
```

### dto request, response 명명 규칙
```
request -> request-이름.dto.ts      
response -> response-이름.dto.ts      
```

### enumeration 명명 규칙
```
이름.type.ts 으로 명명 ex) user-role.type.ts      
export enum UserRoleType {      
  ADMIN = 'admin',      
  USER = 'user',      
}      
```