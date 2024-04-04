<?php include_once "header.php"; ?>


<!-- 로그인 -->
<div class="log s1">
    <h1>로그인</h1>
    <div class="back">
        <div class="modal">
            <form id="form" method="post">
                <input type="text" name="id" id="id" placeholder="아이디">
                <input type="password" name="password" id="pass" placeholder="비밀번호">
                <select name="memeber" id="memeber">
                    <option value="회원구분" hidden>회원구분</option>
                    <option value="관리자">관리자</option>
                    <option value="담당자">담당자</option>
                    <option value="일반회원">일반회원</option>
                </select>
                <div class="btn">
                    <button class="submitBtn">로그인</button>
                </div>
            </form>
        </div>
    </div>
</div>


<?php include_once "footer.php"; ?>